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
} from '@/lib/stripe/utils';
import {
  convertShippoShipmentsToStripe,
  determineParcelSize,
} from '@/lib/stripe-shippo-integrations';

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
    console.log('Shippo parcel:', parcel);
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
      parcels: [result.objectId],
      carrierAccounts: ['5584b761c37843d881dbbf8ab6225bd4'],
    });
    const shippingOptions = convertShippoShipmentsToStripe(shipment);
    if (shippingOptions.length < 1) {
      throw new Error(`Error fetching shipping options`);
    }

    const customFieldProps: Partial<Stripe.Checkout.SessionCreateParams> = {
      custom_fields: [],
    };

    // ceramic magnet
    customFieldProps.custom_fields?.push({
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

    const hasOilDispensers = cartItems.filter(
      (item) => item.product.metadata.type === 'oil dispensers'
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
      address.email
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
