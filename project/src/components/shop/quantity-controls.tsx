'use client';

import { useState } from 'react';
import { Tables } from '@/lib/supabase/database';
import AddToCartButton from './add-to-cart';

export default function QuantityControls({
  product,
}: {
  product: Tables<'products'>;
}) {
  const [quantity, setQuantity] = useState<number>(1);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.inventory));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div className='col-span-2 mt-2 flex flex-col gap-4 sm:col-span-1 sm:mt-0'>
        <div className='flex items-center justify-between sm:justify-start'>
          <div className='flex items-center'>
            <button
              onClick={decrementQuantity}
              className='px-2 py-1 text-4xl font-light transition-colors hover:bg-gray-100'
              aria-label='Decrease quantity'
            >
              -
            </button>
            <span className='min-w-[24px] px-2 py-1 text-center text-4xl font-light'>
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className='px-2 py-1 text-4xl font-light transition-colors hover:bg-gray-100'
              aria-label='Increase quantity'
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <AddToCartButton
          label={`add to order`}
          variant={'default'}
          product={product}
          quantity={quantity}
        />
      </div>
    </>
  );
}
