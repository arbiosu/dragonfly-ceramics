'use client';

import { Tables } from '@/lib/supabase/database';
import ProductCard from '@/components/shop/product-card';
import SubscribeCard from '../subscribe-card';

export default function ProductsGrid({
  products,
}: {
  products: Tables<'products'>[];
}) {
  return (
    <section>
      {products.length > 0 ? (
        <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
          {products.map((product) => (
            <div key={product.id} className='flex justify-center'>
              <ProductCard product={product} key={product.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex h-40 items-center justify-center'>
          <p className='text-4xl tracking-[-0.069em] text-black'>sold out!</p>
          <p className='text-2xl tracking-[-0.069em] text-black'>
            {
              'not seeing what you’re looking for? sign up for my newsletter so you don’t miss when new items come out of the kiln!'
            }
          </p>
          <SubscribeCard text='' />
        </div>
      )}
    </section>
  );
}
