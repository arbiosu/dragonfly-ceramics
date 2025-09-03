import Link from 'next/link';
import { fetchProducts } from '@/lib/supabase/model';
import AdminProductCard from './admin-product-card';

export default async function ProductPortal() {
  const { data, count, error } = await fetchProducts(
    0,
    100,
    null,
    null,
    'date_desc'
  );

  if (error || count == null) {
    return (
      <h1 className='text-3xl text-df-text'>
        There has been an error with the admin portal.
      </h1>
    );
  }
  return (
    <section className='container mx-auto py-20 text-black'>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-start'>
          <h1 className='text-4xl font-bold'>Product Portal</h1>
          <h2 className='text-2xl'>
            Total Products saved in Database: <strong>{count}</strong>
          </h2>
          <p className='font-bold'>
            Note: These are the products that will show up on the shop page.
          </p>
          <p className='font-bold'>Note: Use Ctrl+F for easy searching</p>
          <p className='font-bold'>Note: Image uploads are capped at 2MB</p>
        </div>
      </div>

      <div className='flex justify-center p-10'>
        <Link href='/admin' className='rounded bg-dfNew2 p-4'>
          Back to Admin Portal
        </Link>
      </div>

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
