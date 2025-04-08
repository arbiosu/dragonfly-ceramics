'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type Product } from '@/lib/stripe/utils';
import { useState, useCallback, useMemo } from 'react';
import { useCart } from '@/contexts/CartContext';
import SubscribeCard from '@/components/subscribe-card';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const images = useMemo(() => product.images, [product.images]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product.active) {
      return;
    }
    const availableInventory = Number(product.metadata.inventory) || 0;
    if (quantity > availableInventory) {
      alert(`Only ${availableInventory} items available in stock.`);
      return;
    }

    addToCart(product, quantity);

    setQuantity(1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const incrementQuantity = () => {
    const availableInventory = Number(product.metadata.inventory) || 10;
    setQuantity((prev) => Math.min(prev + 1, availableInventory));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleChangeImage = useCallback(
    (direction: 'next' | 'prev') => {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      const timeout = setTimeout(() => {
        setSelectedImageIndex((prevIndex) => {
          if (direction === 'next') {
            return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
          } else {
            return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
          }
        });
      }, 300); // 300ms debounce

      setDebounceTimeout(timeout);
    },
    [images.length, debounceTimeout]
  );

  const excludedKeys = ['type', 'height', 'length', 'width', 'weight'];

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

          {/* Main Image */}
          <div className='relative mx-auto aspect-square w-full max-w-2xl'>
            <Image
              src={images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.description || "Product image"}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="empty"
              priority
              unoptimized
            />
          </div>

          {/* Image Navigation */}
          {images.length > 1 && (
            <div className='mt-4 flex items-center justify-center space-x-4'>
              <button
                onClick={() => handleChangeImage('prev')}
                className='rounded-full bg-dfNew p-2 hover:bg-dfNew2 focus:outline-none focus:ring-2 focus:ring-df-text'
                aria-label='Previous Image'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M15 18l-6-6 6-6' />
                </svg>
              </button>

              {/* Image Counter */}
              <div className='text-sm text-gray-600'>
                {selectedImageIndex + 1} / {images.length}
              </div>

              <button
                onClick={() => handleChangeImage('next')}
                className='rounded-full bg-dfNew p-2 hover:bg-dfNew2 focus:outline-none focus:ring-2 focus:ring-df-text'
                aria-label='Next Image'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M9 18l6-6-6-6' />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className='flex flex-col space-y-6 py-20'>
          <div>
            <h1 className='text-3xl text-df-text'>
              {product.name.toLowerCase()}
            </h1>
            {/* Price */}
            <div className='mt-4'>
            {product.active ? (
          <p className='text-xl text-df-text'>
            ${product.price}
          </p>
          ): (
            <p className='text-xl text-df-text'>
              <s>${product.price}</s><br></br>sold out!
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

          {product.metadata && Object.keys(product.metadata).length > 0 && (
            <div className='space-y-2'>
              <div className='flex items-center'>
                <h3 className='mr-2 text-xl text-df-text'>details</h3>
                <button
                  onClick={toggleDetails}
                  className='text-2xl text-black focus:outline-none'
                >
                  {detailsVisible ? '-' : '+'}
                </button>
              </div>
              <ul
                className={`list-disc pl-5 text-df-text transition-all duration-300 ${detailsVisible ? 'block' : 'hidden'}`}
              >
                {Object.entries(product.metadata)
                  .filter(([key]) => !excludedKeys.includes(key))
                  .map(([key, value]) => (
                    <li key={key}>
                      <span className='text-lg text-df-text'>
                        {key}: {value}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className='flex items-center space-x-4 text-df-text'>
            <label htmlFor='quantity' className='text-xl text-df-text'>
              Quantity:
            </label>
            <div className='flex items-center overflow-hidden rounded-md border'>
              <button
                onClick={decrementQuantity}
                className='px-3 py-2 transition-colors'
                aria-label='Decrease Quantity'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
              </button>
              <input
                type='number'
                id='quantity'
                min='1'
                max={Number(product.metadata.inventory) || 10}
                value={quantity}
                onChange={handleQuantityChange}
                className='w-16 appearance-none px-2 py-2 text-center outline-none'
              />
              <button
                onClick={incrementQuantity}
                className='px-3 py-2 transition-colors'
                aria-label='Increase Quantity'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <button
              className='w-full rounded-md bg-dfNew2 px-4 py-2 text-df-text transition-colors hover:bg-dfNew hover:text-white'
              onClick={handleAddToCart}
              disabled={product.active}
            >
              {product.active ? `add ${quantity} to cart` : "sold out!"}
            </button>
          </div>

          {/* Additional Information */}
          <div className='mt-6 border-t border-gray-200 pt-6'>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className=''>Availability</p>
                <p className='font-medium text-df-text'>
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
