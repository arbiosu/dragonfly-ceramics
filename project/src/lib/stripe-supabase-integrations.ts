import Stripe from 'stripe';
import { TablesInsert } from './supabase/database';

export function serializeStripeProduct(
  product: Stripe.Product,
  unitAmount: number
): TablesInsert<'products'> {
  return {
    name: product.name,
    active: product.active,
    stripe_id: product.id,
    stripe_price_id:
      typeof product.default_price === 'string'
        ? product.default_price
        : product.default_price == null
          ? ''
          : product.default_price.id,
    price: unitAmount,
    description: product.description ? product.description : '',
    images: product.images,
    weight: product.metadata.weight,
    length: product.metadata.length,
    width: product.metadata.width,
    height: product.metadata.height,
    inventory: parseInt(product.metadata.inventory),
    type: product.metadata.type,
    care: product.metadata.care,
    color: product.metadata.color,
    set: product.metadata.set,
    capacity: product.metadata.capacity,
    single: product.metadata.single === 'true' ? true : false,
  };
}
