import Link from 'next/link';
import Image from 'next/image';
import { Tables } from '@/lib/supabase/database';

export default function ProductCard({
  product,
  isPreview,
}: {
  product: Tables<'products'>;
  isPreview: boolean;
}) {
  return (
    <div className='w-full'>
      <div className='relative aspect-square w-full overflow-hidden rounded-[3em] border border-black p-4 transition-transform duration-300 md:rounded-[5em] xl:hover:-translate-y-2'>
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
        {isPreview ? null : (!product.single && product.inventory > 0) ||
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
      <div className='flex items-start justify-between space-y-0.5 p-4'>
        <div className='flex min-w-0 flex-1 flex-col'>
          <p className='overflow-x-hidden text-ellipsis whitespace-nowrap font-medium md:text-xl'>
            {product.name}
          </p>
          <p className='overflow-x-hidden text-ellipsis whitespace-nowrap font-extralight md:text-xl'>
            {product.color}
          </p>
          <p className='font-extralight md:text-xl'>{product.capacity}</p>
          <p className='font-extralight md:text-xl'>
            {product.set ? `set of ${product.set}` : null}
          </p>
        </div>
        <div className='flex flex-col justify-start'>
          {product.discount && (
            <p className='font-extralight line-through md:text-xl'>
              {product.discount}
            </p>
          )}
          <p className='font-extralight md:text-xl'>${product.price / 100}</p>
        </div>
      </div>
    </div>
  );
}
