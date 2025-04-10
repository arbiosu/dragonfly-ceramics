import { type Shipment } from 'shippo';
import { type ShippingRateObject } from '@/lib/stripe/utils';

export function convertShippoShipmentsToStripe(
  shipment: Shipment
): ShippingRateObject[] {
  const shippingOptions: ShippingRateObject[] = [];
  for (const rate of shipment.rates) {
    shippingOptions.push({
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: parseInt(rate.amount) * 100,
          currency: 'usd',
        },
        display_name: rate.servicelevel.name ?? 'no service name available',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: rate.estimatedDays ?? 7,
          },
          maximum: {
            unit: 'business_day',
            value: rate.estimatedDays ?? 7,
          },
        },
      },
    });
  }
  return shippingOptions;
}
