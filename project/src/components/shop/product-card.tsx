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
      className='group relative w-full max-w-sm cursor-pointer select-none overflow-hidden transition-transform hover:scale-[1.01]'
    >
      {/* Image */}
      <div className='relative aspect-square w-full overflow-hidden rounded-3xl border border-black p-4'>
        <NextImageWrapper
          url={product.images[0]}
          altText={product.description}
          sizeProps='(max-width: 768px) 100vw, 256px'
        />

        {/* Inventory Sticker */}
        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${
            product.active && product.inventory > 0
              ? 'bg-df-yellow text-black'
              : 'bg-red-500 text-white'
          }`}
        >
          {product.active && product.inventory > 0
            ? `${product.inventory} left`
            : 'sold out'}
        </div>
      </div>

      {/* Product Info */}
      <div className='p-4 text-black'>
        <div className='flex items-start justify-between'>
          <div className='min-w-0 flex-1 -space-y-1'>
            <h3 className='truncate text-xl font-medium'>
              {product.type.slice(0, -1).toLowerCase()}
            </h3>
            <p className='-mt-2 truncate text-base font-extralight md:text-lg'>
              {product.color}
            </p>
            <p className='-mt-2 text-base font-extralight md:text-lg'>
              {product.capacity}
            </p>
            {product.set && (
              <p className='-mt-2 text-base font-extralight md:text-lg'>
                set of {product.set}
              </p>
            )}
          </div>
          <div className='ml-4 flex shrink-0 flex-col items-end'>
            {product.active ? (
              <p className='text-lg font-light'>${product.price / 100}</p>
            ) : (
              <p className='text-lg font-light'>
                <s>${product.price / 100}</s>
              </p>
            )}
            <span
              className={`mt-1 inline-block h-3 w-3 transform border-b-2 border-r-2 border-gray-700 transition-transform duration-300 ${
                open ? 'rotate-45' : 'rotate-[225deg]'
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='mt-2 flex flex-col gap-2 text-center'>
          <Link
            href={`/shop/${product.stripe_id}`}
            prefetch={false}
            className={buttonClass}
          >
            details
          </Link>
          <AddToCartButton label='add to cart' product={product} quantity={1} />
        </div>
      </div>
    </div>
  );
}
