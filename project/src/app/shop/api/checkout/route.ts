import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import {
  stripeCheckout,
  validateCart,
  CartItem,
  ShippingRateObject,
} from '@/lib/stripe/utils';
import { calculateShipping } from '@/lib/shipping/utils';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const { cartItems } = (await request.json()) as { cartItems: CartItem[] };

    // Validate cart items
    const validatedCart = await validateCart(cartItems);

    // Calculate shipping options
    const shippingOptions: ShippingRateObject[] = calculateShipping(cartItems);

    // Prepare oil dispenser custom fields
    const oilDispenserProps: Partial<Stripe.Checkout.SessionCreateParams> = {
      custom_fields: [],
    };

    // Add magnet question
    oilDispenserProps.custom_fields?.push({
      key: 'magnet',
      label: { type: 'custom', custom: 'Include free ceramic magnet?' },
      type: 'dropdown',
      dropdown: {
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
    });

    // Generate color selection fields with unique keys
    const hasOilDispensers = cartItems.filter(
      (item) => item.product.metadata.type === 'oil dispensers'
    );

    let colorFieldIndex = 0;
    for (const oilDispenser of hasOilDispensers) {
      for (let i = 0; i < oilDispenser.quantity; i++) {
        oilDispenserProps.custom_fields?.push({
          key: `color_${colorFieldIndex++}`,
          label: {
            type: 'custom',
            custom: 'Choose a color for your Oil Dispenser top',
          },
          type: 'dropdown',
          dropdown: {
            options: [
              { label: 'Silver', value: 'silver' },
              { label: 'Gold', value: 'gold' },
            ],
          },
        });
      }
    }

    // Create Stripe checkout session
    const session = await stripeCheckout(
      validatedCart,
      origin,
      oilDispenserProps,
      shippingOptions
    );

    if (!session.url) {
      throw new Error('Failed to create checkout session URL');
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;

    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      errorMessage = error.message;
      statusCode = error.statusCode || 500;
    }
    // Handle timeout errors
    else if (error instanceof Error && 'code' in error && error.code === 23) {
      errorMessage = 'Checkout process timed out';
      statusCode = 504;
    }
    // Generic error handling
    else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
