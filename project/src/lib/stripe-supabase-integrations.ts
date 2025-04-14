import { TablesInsert } from './supabase/database';
import Stripe from 'stripe';

export function serializeStripeProduct(
  product: Stripe.Product
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
    price:
      product.default_price == null
        ? 0
        : typeof product.default_price !== 'string' &&
            product.default_price.unit_amount
          ? product.default_price.unit_amount
          : 0,
    description: product.description ? product.description : '',
    images: product.images,
    weight: product.metadata.weight,
    length: product.metadata.length,
    width: product.metadata.width,
    height: product.metadata.height,
    inventory: parseInt(product.metadata.inventory),
    type: product.metadata.type,
  };
}
