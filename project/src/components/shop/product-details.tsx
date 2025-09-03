import Link from 'next/link';
import { Tables } from '@/lib/supabase/database';
import ImageCarousel from '../image-carousel';
import QuantityControls from './quantity-controls';

export default function ProductDetails({
  product,
}: {
  product: Tables<'products'>;
}) {
  return (
    <div className='container mx-auto px-4 py-20 text-black'>
      <Link
        href={'/shop'}
        className='mb-4 inline-flex items-center gap-2 px-2 text-2xl font-light tracking-[-0.04em] transition-colors hover:text-dfNew2 lg:px-20'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
          className='shrink-0'
        >
          <path d='M19 12H5' />
          <path d='M12 19l-7-7 7-7' />
        </svg>
        <span>back to shop</span>
      </Link>
      <div className='grid grid-cols-1 gap-8 rounded-3xl md:grid-cols-2 lg:gap-12'>
        <div className='space-y-4'>
          <ImageCarousel images={product.images} />
        </div>

        <div className='-mt-4 flex flex-col space-y-4'>
          <div>
            <h1 className='text-6xl font-medium tracking-[-0.04em]'>
              {product.type.slice(0, -1).toLowerCase()}
            </h1>
            <p className='text-6xl font-extralight tracking-[-0.04em]'>
              {product.color}
            </p>
            {/* Price */}
            <div>
              {product.active ? (
                <p className='mx-1 mt-2 text-4xl font-medium tracking-[-0.04em]'>
                  ${product.price / 100}.00
                </p>
              ) : (
                <p className='mx-1 mt-2 text-4xl font-medium tracking-[-0.04em]'>
                  <s>${product.price / 100}</s>
                  <br></br>sold out!
                </p>
              )}
            </div>
          </div>

          <div>
            <p className='text-xl font-light tracking-[-0.04em]'>
              {product.description.toLowerCase() || 'No description available'}
            </p>
          </div>
          {/* Details */}
          <div className='space-y-2'>
            <div className='flex items-center'>
              <h3 className='mr-2 text-xl font-light tracking-[-0.04em]'>
                -{product.care}
              </h3>
            </div>
          </div>
          <div className='flex items-center space-x-4 text-df-text'>
            <QuantityControls product={product} />
          </div>

          {/* Additional Information */}
          <div className='mt-6 border-t border-gray-300 pt-6 text-df-text'>
            <div className='flex gap-2'>
              <div>
                <p className='text-xl font-light tracking-[-0.04em]'>
                  availability:
                </p>
              </div>
              <div>
                <p className='text-xl tracking-[-0.04em]'>
                  {product.active
                    ? ` ${product.inventory} in stock`
                    : ' Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
