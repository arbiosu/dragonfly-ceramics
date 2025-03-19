"use server";

import Stripe from 'stripe';
import { stripe } from './stripe';


export interface CartItem {
    product: Stripe.Product;
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
      delivery_estimate: {
        minimum: {
          unit: 'business_day';
          value: number;
        };
        maximum: {
          unit: 'business_day';
          value: number;
        };
      };
    };
}

export async function fetchProducts(): Promise<Stripe.Product[]> {
    try {
        const products = await stripe.products.list({ 
            expand: ["data.default_price"],
            active: true,
        });
        return products.data;
    } catch (error) {
        throw new Error(`Failed to retrieve products in getProducts with error: ${error}`);
    }
};

export async function fetchProductById(id: string): Promise<Stripe.Product> {
    try {
        const product = await stripe.products.retrieve(id, {
            expand: ["default_price"],
        });
        return product;
    } catch (error) {
        throw new Error(`Failed to retrieve product ${id} with error: ${error}`);
    }
}

export async function updateProductImagesById(id: string, newImages: string[]): Promise<Stripe.Product> {
    try {
        const product = await stripe.products.update(id, {
            images: newImages
        });
        return product;
    } catch (error) {
        throw new Error(`Failed to add image to product with ID ${id} with error ${error}`);
    }
}

export async function validateCart(
    cart: CartItem[]
): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> {

    const lineItems = await Promise.all(
        cart.map(async (item) => {
            try {
                const validatedProduct = await stripe.products.retrieve(item.product.id);
                if (
                    !validatedProduct.default_price
                    || 
                    typeof validatedProduct.default_price !== 'string'
                ) {
                    throw new Error('Invalid or missing price');
                }
    
                const validatedQuantity = item.quantity > 0 ? item.quantity : 1;
    
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
};


export async function stripeCheckout(
    validatedCart: Stripe.Checkout.SessionCreateParams.LineItem[],
    origin: string | null,
    oilDispenserProps: Partial<Stripe.Checkout.SessionCreateParams>,
    shippingOptions: ShippingRateObject[],
) {
    try {        
        const session = await stripe.checkout.sessions.create({
            line_items: validatedCart,
            ...oilDispenserProps,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US'],
            },
            shipping_options: shippingOptions,
            mode: 'payment',
            success_url: `${origin}/shop/cart/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/shop/cart/canceled`,
        });
    
        return session;
    } catch (error) {
        throw new Error(`Failed to checkout at ${Date.now()} with error ${error}`);
    }
};


export async function stripeCheckoutSuccess(sessionId: string) {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'line_items.data.price.product', 'payment_intent']
        });

        const status = session.status;
        const customerEmail = session.customer_details?.email;
    
        return { session, status, customerEmail };
    } catch (error) {
        throw new Error(`Failed to retrieve session ${sessionId} with error - ${error}`)
    }
};

