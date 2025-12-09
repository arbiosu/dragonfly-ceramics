import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Stripe } from 'stripe';
import {
  createShippoAddress,
  createShippoParcel,
  createShippoShipment,
} from '@/lib/shippo/utils';
import { type ShippoAddress } from '@/lib/shippo/types';
import {
  stripeCheckout,
  validateCart,
  type CartItem,
  type ShippingRateObject,
} from '@/lib/stripe/utils';
import {
  determineParcelSize,
  isUPSGround,
  convertShippoRateToStripeShippingOption,
} from '@/lib/stripe-shippo-integrations';
import { Rate } from 'shippo';

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const { address, cartItems } = (await req.json()) as {
      address: ShippoAddress;
      cartItems: CartItem[];
    };
    const validatedCart = await validateCart(cartItems);

    const lookup = await createShippoAddress(address);
    if (!lookup.validationResults?.isValid) {
      throw new Error('Invalid address');
    }

    const parcel = determineParcelSize(cartItems);
    const result = await createShippoParcel(parcel);
    if (result.objectId == null) {
      throw new Error(`Failed to create a parcel`);
    }
    if (result.objectState == null) {
      throw new Error(`Invalid parcel`);
    }

    const shipment = await createShippoShipment({
      addressFrom: 'b86852b1c9de48a49f272563318ca4dd',
      addressTo: lookup.objectId!,
      addressReturn: 'b86e3d4b746e44e98d08ed4236558b16',
      parcels: [result.objectId],
      extra: {
        insurance: {
          amount: '100',
          currency: 'USD',
          content: 'Pottery',
        },
      },
    });
    let selectedRate: Rate | null = null;
    const shippingOptions: ShippingRateObject[] = [];
    for (const rate of shipment.rates) {
      if (isUPSGround(rate)) {
        const option = convertShippoRateToStripeShippingOption(rate);
        shippingOptions.push(option);
        selectedRate = rate;
      }
    }
    if (selectedRate == null) {
      throw new Error('Failed to select a rate');
    }

    const customFieldProps: Partial<Stripe.Checkout.SessionCreateParams> = {
      custom_fields: [],
    };

    const hasOilDispensers = cartItems.filter(
      (item) => item.product.type === 'oil dispensers'
    );

    let colorFieldIndex = 0;
    for (const oilDispenser of hasOilDispensers) {
      for (let i = 0; i < oilDispenser.quantity; i++) {
        customFieldProps.custom_fields?.push({
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

    const session = await stripeCheckout(
      validatedCart,
      origin,
      customFieldProps,
      address,
      shippingOptions,
      address.email,
      selectedRate.objectId
    );

    if (!session.url) {
      throw new Error(`Failed to create checkout session URL`);
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
