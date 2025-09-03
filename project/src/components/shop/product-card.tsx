import Link from 'next/link';
import { Tables } from '@/lib/supabase/database';
import { NextImageWrapper } from '@/components/image';

export default function ProductCard({
  product,
}: {
  product: Tables<'products'>;
}) {
  return (
    <div className='group relative w-full max-w-sm cursor-pointer select-none overflow-hidden transition-transform hover:scale-[1.01]'>
      <Link href={`/shop/${product.stripe_id}`} prefetch={false}>
        <div className='relative aspect-square w-full overflow-hidden rounded-[5em] border border-black p-4'>
          <NextImageWrapper
            url={product.images[0]}
            altText={product.description}
            sizeProps='(max-width: 768px) 100vw, 256px'
          />

          <div
            className={`absolute right-6 top-3 w-1/3 rotate-12 rounded-[50%] px-1 py-1 text-center text-sm shadow md:w-1/4 md:px-2 md:py-2 md:text-lg ${
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
                <>
                  <s>{product.discount}</s>
                  <p className='text-lg font-light'>${product.price / 100}</p>
                </>
              ) : (
                <p className='text-lg font-light'>
                  <s>${product.price / 100}</s>
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
