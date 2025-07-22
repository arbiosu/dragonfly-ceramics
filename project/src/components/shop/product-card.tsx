'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Tables } from '@/lib/supabase/database';
import AddToCartButton from '@/components/shop/add-to-cart';
import { NextImageWrapper } from '@/components/image';

const buttonClass =
  'w-full rounded-md bg-dfNew2 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base text-df-text transition-colors hover:bg-dfNew hover:text-white';

export default function ProductCard({
  product,
}: {
  product: Tables<'products'>;
}) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      onClick={handleToggle}
      className='shadow-t-md relative w-full max-w-sm overflow-hidden'
    >
      {/* Image */}
      <div className='relative aspect-square w-full overflow-hidden rounded-3xl border-4 border-dfNew2 p-4'>
        <NextImageWrapper
          url={product.images[0]}
          altText={product.description}
          sizeProps='(max-width: 768px) 100vw, 256px'
        />

        {/* Inventory Sticker */}
        <div
          className={`absolute right-2 top-2 rounded-full px-4 py-2 text-xs text-black shadow ${product.active ? 'bg-yellow-300' : 'bg-red-500'}`}
        >
          {product.active && product.inventory > 0 ? (
            <span className='rounded-md text-df-text'>
              {product.inventory} left
            </span>
          ) : (
            <span className='rounded-full text-white'>sold out</span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className='mt-4 flex flex-col gap-2'>
        <div className='flex w-full items-start justify-between'>
          <h3 className='truncate text-base font-semibold text-df-text'>
            {product.name.toLowerCase()}
          </h3>
          <div className='p-4 pt-0'>
            {product.active ? (
              <p className='text-base font-semibold text-df-text'>
                ${product.price / 100}
              </p>
            ) : (
              <p className='text-base text-df-text'>
                <s>${product.price / 100}</s>
              </p>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className='flex flex-col gap-2'>
          <Link
            href={`/shop/${product.stripe_id}`}
            prefetch={false}
            className={buttonClass}
          >
            details
          </Link>
          <AddToCartButton label='add to cart' product={product} quantity={1} />
        </div>
      )}
    </div>
  );
}
