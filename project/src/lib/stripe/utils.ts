'use server';

import Stripe from 'stripe';
import { stripe } from './stripe';
import { ShippoAddress } from '../shippo/types';
import { Tables } from '@/lib/supabase/database';

export interface CartItem {
  product: Tables<'products'>;
  quantity: number;
}

export interface ShippingRateObject {
  shipping_rate_data: {
    type: 'fixed_amount';
    fixed_amount: {
      amount: number;
      currency: string;
    };
    display_name: string;
  };
}

export async function fetchStripeProducts(): Promise<Stripe.Product[]> {
  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100,
    });
    return products.data;
  } catch (error) {
    throw new Error(
      `Failed to retrieve products in getProducts with error: ${error}`
    );
  }
}

export async function fetchProductById(id: string): Promise<Stripe.Product> {
  try {
    const product = await stripe.products.retrieve(id, {
      expand: ['default_price'],
    });
    return product;
  } catch (error) {
    throw new Error(`Failed to retrieve product ${id} with error: ${error}`);
  }
}

export async function updateProductImagesById(
  id: string,
  newImages: string[]
): Promise<Stripe.Product> {
  try {
    const product = await stripe.products.update(id, {
      images: newImages,
    });
    return product;
  } catch (error) {
    throw new Error(
      `Failed to add image to product with ID ${id} with error ${error}`
    );
  }
}

export async function validateCart(
  cart: CartItem[]
): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> {
  const lineItems = await Promise.all(
    cart.map(async (item) => {
      try {
        const validatedProduct = await stripe.products.retrieve(
          item.product.stripe_id
        );
        if (
          validatedProduct.default_price == null ||
          typeof validatedProduct.default_price !== 'string'
        ) {
          throw new Error('Invalid or missing price');
        }

        const validatedQuantity = item.quantity > 0 ? item.quantity : 1;
        const inventoryAvailable = item.product.inventory >= validatedQuantity;
        if (!inventoryAvailable) {
          throw new Error(
            `[Stripe Checkout] Not enough inventory for ${item.product.id}`
          );
        }

        return {
          price: validatedProduct.default_price,
          quantity: validatedQuantity,
        };
      } catch (error) {
        throw new Error(`Failed to validate cart with error ${error}`);
      }
    })
  );

  return lineItems;
}

export async function stripeCheckout(
  validatedCart: Stripe.Checkout.SessionCreateParams.LineItem[],
  origin: string | null,
  customFieldProps: Partial<Stripe.Checkout.SessionCreateParams>,
  shippingAddress: ShippoAddress,
  shippingOptions: ShippingRateObject[],
  email: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: validatedCart,
      customer_email: email,
      ...customFieldProps,
      billing_address_collection: 'required',
      payment_intent_data: {
        shipping: {
          name: shippingAddress.name,
          address: {
            line1: shippingAddress.street1,
            line2: shippingAddress.street2,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postal_code: shippingAddress.zip,
            country: shippingAddress.country,
          },
        },
      },
      shipping_options: shippingOptions,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${origin}/shop/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/cart/canceled`,
    });

    return session;
  } catch (error) {
    throw new Error(`Failed to checkout at ${Date.now()} with error ${error}`);
  }
}

export async function stripeCheckoutSuccess(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'payment_intent'],
    });

    const status = session.status;
    const customerEmail = session.customer_details?.email;
    const address =
      session.payment_intent &&
      typeof session.payment_intent !== 'string' &&
      session.payment_intent.shipping
        ? session.payment_intent.shipping.address
        : null;

    return { session, status, customerEmail, address };
  } catch (error) {
    throw new Error(
      `Failed to retrieve session ${sessionId} with error - ${error}`
    );
  }
}

export async function deductInventory(sessionId: string) {
  try {
    const sessionLineItems =
      await stripe.checkout.sessions.listLineItems(sessionId);
    for (const item of sessionLineItems.data) {
      if (!item.price?.product || !item.quantity) continue;

      const productId =
        typeof item.price.product === 'string'
          ? item.price.product
          : item.price.product.id;

      await updateInventory(productId, item.quantity);
    }
  } catch (error) {
    throw new Error(
      `[deductInventory] Failed to deduct inventory with ${error}`
    );
  }
}

export async function updateInventory(productId: string, deduction: number) {
  try {
    const product = await stripe.products.retrieve(productId);
    const currentInventory = parseInt(product.metadata.inventory);
    const newInventory = currentInventory - deduction;
    const newInventoryString = newInventory.toString();
    await stripe.products.update(productId, {
      metadata: {
        inventory: newInventoryString,
      },
      active: newInventory > 0,
    });
  } catch (error) {
    throw new Error(
      `[updateInventory] failed to update inventory with error ${error}`
    );
  }
}
