'use client';

import { Tables } from '@/lib/supabase/database';
import ProductCard from '@/components/shop/product-card';

export default function ProductsGrid({
  products,
}: {
  products: Tables<'products'>[];
}) {
  return (
    <div>
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
          <p className='text-2xl font-semibold text-df-text'>sold out!</p>
        </div>
      )}
    </div>
  );
}
