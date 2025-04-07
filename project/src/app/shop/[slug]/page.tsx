import { redirect } from 'next/navigation';
import { fetchProductById } from '@/lib/stripe/utils';
import ProductDetails from '@/components/shop/product-details';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;
  const stripeProduct = await fetchProductById(id);

  if (!stripeProduct) {
    redirect('/shop');
  }
  const product = {
    id: stripeProduct.id,
    active: stripeProduct.active,
    description: stripeProduct.description || 'No description',
    name: stripeProduct.name,
    images: stripeProduct.images,
    metadata: stripeProduct.metadata,
    price:
      stripeProduct.default_price &&
      typeof stripeProduct.default_price !== 'string' &&
      stripeProduct.default_price.unit_amount
        ? (stripeProduct.default_price.unit_amount / 100).toString()
        : 'No pricing data.',
  };
  return (
    <main className='flex justify-center py-20'>
      <ProductDetails product={product} />
    </main>
  );
}
