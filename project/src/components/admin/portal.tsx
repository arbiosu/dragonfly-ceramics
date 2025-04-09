import { fetchProducts } from '@/lib/stripe/utils';
import AdminProductCard from './admin-product-card';

export default async function AdminPortal() {
  const products = await fetchProducts();
  return (
    <section className='py-20'>
      <h1 className='text-center text-2xl text-df-text'>Admin Portal</h1>
      <div className='grid grid-cols-2 gap-4 md:mx-40 md:grid-cols-3'>
        {products.map((product, index) => (
          <div key={index} className='flex justify-center'>
            <AdminProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
