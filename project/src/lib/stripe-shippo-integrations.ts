import { type Shipment, type Rate } from 'shippo';
import { type ShippingRateObject, type CartItem } from '@/lib/stripe/utils';
import { ShippoParcel } from './shippo/types';

interface Box {
  length: number;
  width: number;
  height: number;
  volume: number;
}

const smallCubicBox: Box = {
  length: 7,
  width: 7,
  height: 6,
  volume: 7 * 7 * 6,
};
const largeCubicBox: Box = {
  length: 12,
  width: 12,
  height: 8,
  volume: 12 * 12 * 8,
};

export function convertShippoShipmentsToStripe(
  shipment: Shipment
): ShippingRateObject[] {
  const selectedRate: Rate[] = [];
  const shippingOptions: ShippingRateObject[] = [];
  for (const item of shipment.rates) {
    if (item.servicelevel.token === 'usps_priority') {
      console.log('price string', item.amount);
      console.log('parseInt', parseInt(item.amount));
      selectedRate.push(item);
    }
  }
  for (const rate of selectedRate) {
    shippingOptions.push({
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: Math.round(parseFloat(rate.amount) * 100),
          currency: 'usd',
        },
        display_name: rate.servicelevel.name ?? 'no service name available',
      },
    });
  }
  return shippingOptions;
}

export function determineParcelSize(cart: CartItem[]): ShippoParcel {
  let totalWeight = 0;
  let totalVolume = 0;
  let maxLength = 0;
  let maxWidth = 0;
  let maxHeight = 0;

  for (const item of cart) {
    const weight = parseInt(item.product.metadata.weight) * item.quantity;
    const length = parseInt(item.product.metadata.length);
    const width = parseInt(item.product.metadata.width);
    const height = parseInt(item.product.metadata.height);

    totalWeight += weight;
    totalVolume += item.quantity * (length * width * height);

    if (length > maxLength) maxLength = length;
    if (width > maxWidth) maxWidth = width;
    if (height > maxHeight) maxHeight = height;
  }

  if (
    totalVolume < smallCubicBox.volume &&
    maxLength < smallCubicBox.length &&
    maxWidth < smallCubicBox.width &&
    maxHeight < smallCubicBox.height
  ) {
    return {
      massUnit: 'lb',
      distanceUnit: 'in',
      weight: totalWeight.toString(),
      length: smallCubicBox.length.toString(),
      width: smallCubicBox.width.toString(),
      height: smallCubicBox.height.toString(),
    };
  }
  return {
    massUnit: 'lb',
    distanceUnit: 'in',
    weight: totalWeight.toString(),
    length: largeCubicBox.length.toString(),
    width: largeCubicBox.width.toString(),
    height: largeCubicBox.height.toString(),
  };
}
