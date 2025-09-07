import Link from 'next/link';
import Image from 'next/image';
import { Tables } from '@/lib/supabase/database';

export default function ProductCard({
  product,
}: {
  product: Tables<'products'>;
}) {
  // drops
  if (!product.active && product.inventory > 0) return null;
  return (
    <div className='w-full overflow-hidden transition-transform duration-300 hover:scale-[1.03]'>
      <div className='relative aspect-square w-full overflow-hidden rounded-[3em] border border-black p-4 md:rounded-[5em]'>
        <Link
          href={`/shop/${product.stripe_id}`}
          prefetch={false}
          className='cursor-pointer select-none'
        >
          <Image
            src={product.images[0]}
            alt={product.description}
            fill
            sizes='100vw'
            unoptimized
          />
        </Link>
        {(!product.single && product.inventory > 0) ||
        product.inventory === 0 ? (
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
        ) : null}
      </div>

      <div className='flex-flex-col p-4 text-black'>
        <div className='flex items-start'>
          <div
            className={`grid w-full transition-all duration-300 ease-in-out`}
          >
            <div className='flex w-full flex-col'>
              <div>
                <div className='flex w-full flex-row justify-between'>
                  <p className='-mt-2 text-base font-medium md:text-xl'>
                    {product.type.slice(0, -1).toLowerCase()}
                  </p>
                  <div className='mx-2 flex flex-col justify-end'>
                    {product.active ? (
                      <>
                        <s>{product.discount}</s>
                        <p className='-mt-2 text-base font-extralight md:text-xl'>
                          ${product.price / 100}
                        </p>
                      </>
                    ) : (
                      <p className='-mt-2 text-base font-extralight md:text-xl'>
                        <s>${product.price / 100}</s>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className='-mt-2 text-base font-extralight md:text-xl'>
                  {product.color}
                </p>
              </div>
              <div>
                <p className='-mt-2 text-base font-extralight md:text-xl'>
                  {product.capacity}
                </p>
              </div>
              <div>
                {product.set && (
                  <p className='-mt-2 text-base font-extralight md:text-xl'>
                    set of {product.set}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
