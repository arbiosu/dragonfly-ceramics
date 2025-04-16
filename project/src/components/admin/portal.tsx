import { fetchProducts } from '@/lib/supabase/model';
import AdminProductCard from './admin-product-card';

export default async function AdminPortal() {
  const { data, count, error } = await fetchProducts(0, 100, null, 'date_desc');
  if (error || count == null) {
    return (
      <h1 className='text-3xl text-df-text'>
        There has been an error with the admin portal.
      </h1>
    );
  }
  return (
    <section className='container mx-auto py-20 text-df-text'>
      <h1 className='mb-4 text-center text-2xl'>Admin Portal</h1>
      <h2 className='text-center text-lg'>Total Products: {count}</h2>
      <div className='grid grid-cols-2 gap-4 md:mx-40 md:grid-cols-3'>
        {data.map((product, index) => (
          <div key={index} className='flex justify-center'>
            <AdminProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
