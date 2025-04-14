import { redirect } from 'next/navigation';
import { retrieveProductByStripeId } from '@/lib/supabase/model';
import ProductDetails from '@/components/shop/product-details';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;
  const { data, error } = await retrieveProductByStripeId(id);

  if (error) {
    console.log(error);
    redirect('/shop');
  }

  return (
    <main className='flex justify-center py-20'>
      <ProductDetails product={data} />
    </main>
  );
}
