import Link from 'next/link';
import { Tables } from '@/lib/supabase/database';
import AddToCartButton from '@/components/shop/add-to-cart';
import { NextImageWrapper } from '@/components/image';

const linkClass =
  'hidden group-hover:block w-full rounded-md bg-dfNew2 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base text-df-text transition-colors hover:bg-dfNew hover:text-white';

export default function ProductCard({
  product,
}: {
  product: Tables<'products'>;
}) {
  return (
    <div className='shadow-t-md relative w-full max-w-sm overflow-hidden'>
      {/* Image */}
      <div className='relative aspect-square w-full overflow-hidden'>
        <NextImageWrapper
          url={product.images[0]}
          altText={product.description}
          sizeProps='(max-width: 768px) 100vw, 256px'
        />
        {/* Buttons on hover */}
        <div className='group absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 transition-opacity duration-200 hover:bg-black/40'>
          <Link
            href={`/shop/${product.stripe_id}`}
            prefetch={false}
            className={linkClass}
          >
            details
          </Link>
          <AddToCartButton
            label='add to cart'
            product={product}
            quantity={1}
            variant={'hidden'}
          />
        </div>
      </div>
      <div className='p-2'>
        <h3 className='truncate text-lg text-df-text'>
          {product.name.toLowerCase()}
        </h3>
        <div className='mt-auto'>
          {product.active ? (
            <p className='text-xl text-df-text'>${product.price / 100}</p>
          ) : (
            <p className='text-xl text-df-text'>
              <s>${product.price / 100}</s>
              <br></br>sold out!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
