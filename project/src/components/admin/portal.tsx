'use server';

import {
  fetchProducts,
  serializeStripeProduct,
  type Product,
  updateProductImagesById,
} from '@/lib/stripe/utils';

export default async function AdminPortal() {
  const products = await fetchProducts();
  const serializedProducts: Product[] = [];
  for (const product of products) {
    const serialized = await serializeStripeProduct(product);
    serializedProducts.push(serialized);
  }
  const fix = async () => {
    for (const p of serializedProducts) {
      for (const img of p.images) {
        if (img[8] === 'f') {
          console.log('Stripe link, do not touch!!');
          continue;
        }
        console.log('Before:\n', img, '\n');
        const test = img + '-320w.webp';
        console.log('After:\n', test, '\n');
      }
    }
  };
  fix();
  return (
    <section className='py-20'>
      <h1 className='text-center text-2xl text-df-text'>Admin Portal</h1>
    </section>
  );
}
