import type { ShippingRateObject, CartItem } from '@/lib/stripe/utils';

export function calculateShipping(cart: CartItem[]): ShippingRateObject[] {
  let totalWeightinPounds = 0;
  let additionalWeight = 0;
  for (const item of cart) {
    totalWeightinPounds += Number(item.product.metadata.weight) * item.quantity;
  }

  if (totalWeightinPounds > 3) {
    additionalWeight = totalWeightinPounds - 3;
  }

  const shippingRateObjects: ShippingRateObject[] = [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: (8 + additionalWeight * 1) * 100,
          currency: 'usd',
        },
        display_name: 'Flat Rate',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 2,
          },
          maximum: {
            unit: 'business_day',
            value: 5,
          },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: (10 + additionalWeight * 1) * 100,
          currency: 'usd',
        },
        display_name: 'Priority',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 2,
          },
          maximum: {
            unit: 'business_day',
            value: 3,
          },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: (30 + additionalWeight * 1) * 100,
          currency: 'usd',
        },
        display_name: 'Priority Express',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 1,
          },
          maximum: {
            unit: 'business_day',
            value: 3,
          },
        },
      },
    },
  ];
  return shippingRateObjects;
}
