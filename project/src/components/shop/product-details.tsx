'use client';

import Link from 'next/link';
import { Tables } from '@/lib/supabase/database';
import SubscribeCard from '@/components/subscribe-card';
import ImageCarousel from '../image-carousel';
import QuantityControls from './quantity-controls';

export default function ProductDetails({
  product,
}: {
  product: Tables<'products'>;
}) {
  //const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

  return (
    <div className='container mx-auto px-4 py-20'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12'>
        {/* Product Images Section */}
        <div className='space-y-4'>
          <Link
            href={'/shop'}
            className='mb-4 inline-flex items-center gap-2 px-5 text-2xl text-df-text transition-colors hover:text-dfNew2 focus:ring-4 focus:ring-white md:mx-36'
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
          <ImageCarousel images={product.images} />
        </div>

        <div className='flex flex-col space-y-6 py-20'>
          <div>
            <h1 className='text-3xl text-df-text'>
              {product.name.toLowerCase()}
            </h1>
            {/* Price */}
            <div className='mt-4'>
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

          {/* Description */}
          <div className='prose prose-sm max-w-none text-df-text'>
            <h3 className='text-xl'>description</h3>
            <p>
              {product.description.toLowerCase() || 'No description available'}
            </p>
          </div>

          <div className='flex items-center space-x-4 text-df-text'>
            <QuantityControls product={product} />
          </div>

          {/* Additional Information */}
          <div className='mt-6 border-t border-df-text pt-6 text-df-text'>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p>Availability</p>
                <p className='font-medium'>
                  {product.active ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-12 max-w-lg'>
        <SubscribeCard />
      </div>
    </div>
  );
}
