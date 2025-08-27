'use client';

import type { CartItem } from '@/lib/stripe/utils';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartItemCard({ product, quantity }: CartItem) {
  const { removeFromCart, addToCart, updateCartItemQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(product.stripe_id);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity - 1 === 0) {
      handleRemove();
      return;
    }
    updateCartItemQuantity(product.stripe_id, quantity - 1);
  };

  return (
    <>
      <div className='mb-6 flex w-full flex-col gap-4 text-df-text sm:grid sm:grid-cols-3'>
        {/* Product info */}
        <div className='col-span-3 flex items-center sm:col-span-1'>
          <div className='relative mr-3 h-20 w-20 flex-shrink-0 sm:mr-4 sm:h-24 sm:w-24'>
            <Link href={`/shop/${product.stripe_id}`}>
              <Image
                src={product.images[0] || '/placeholder.svg'}
                alt={product.description}
                fill
                placeholder='blur'
                blurDataURL={product.images[0]}
                sizes='(max-width: 640px) 80px, (max-width: 768px) 96px, 120px'
                className='rounded object-cover'
              />
            </Link>
          </div>
          <div className='truncate'>
            <span className='text-base font-medium sm:text-lg'>
              {product.name}
            </span>
          </div>
        </div>

        <div className='col-span-2 mt-2 flex items-center justify-between sm:col-span-1 sm:mt-0 sm:justify-center'>
          <div className='flex items-center rounded'>
            <button
              onClick={handleDecrementQuantity}
              className='px-2 py-1 text-lg transition-colors hover:bg-gray-100'
              aria-label='Decrease quantity'
            >
              -
            </button>
            <span className='min-w-[24px] px-2 py-1 text-center'>
              {quantity}
            </span>
            <button
              onClick={handleAddToCart}
              className='px-2 py-1 text-lg transition-colors hover:bg-gray-100'
              aria-label='Increase quantity'
            >
              +
            </button>
          </div>
        </div>

        <div className='col-span-3 mt-2 flex items-center justify-between sm:col-span-1 sm:mt-0 sm:justify-end'>
          <span className='text-base font-medium sm:text-lg'>
            ${(product.price * quantity) / 100}
          </span>
          <button
            onClick={handleRemove}
            className='ml-4 p-2 text-gray-500 transition-colors hover:text-red-500'
            aria-label='Remove item'
          >
            <span className='text-xl'>×</span>
          </button>
        </div>
      </div>
      <hr className='my-4 border-gray-200 sm:my-6' />
    </>
  );
}
