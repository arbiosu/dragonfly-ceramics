'use client';

import Link from 'next/link';
import { NextImageWrapper } from '@/components/image';
import { Product } from '@/lib/stripe/utils';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  data: Product;
}

export default function ProductCard({ data }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!data.active || isProcessing) {
      return;
    }
    setIsProcessing(true);
    try {
      addToCart(data, 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error){
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className='shadow-t-md group relative w-full max-w-sm overflow-hidden bg-df-bg'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container TODO: add placeholder svg */}
      <div className='relative aspect-square w-full overflow-hidden'>
        <NextImageWrapper
          url={data.images[0] || '/placeholder.svg'}
          altText={data.description || 'No description'}
          sizeProps='(max-width: 768px) 100vw, 256px'
        />
        {/* Hover Buttons - Appear on hover */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 p-4 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link
            href={`/shop/${data.id}`}
            className='w-full rounded-md bg-dfNew2 px-4 py-2 text-df-text transition-colors hover:bg-dfNew hover:text-white'
            prefetch={false}
          >
            details
          </Link>
          <button
            className='w-full rounded-md bg-dfNew2 px-4 py-2 text-df-text transition-colors hover:bg-dfNew hover:text-white'
            onClick={handleAddToCart}
          >
            {isProcessing ? 'added to cart!' : data.active ? 'add to cart' : 'sold out!'}
          </button>
        </div>
      </div>
      <div className='p-2'>
        <h3 className='truncate text-lg text-df-text'>
          {data.name.toLowerCase()}
        </h3>
        <div className='mt-auto'>
          {data.active ? (
            <p className='text-xl text-df-text'>${data.price}</p>
          ) : (
            <p className='text-xl text-df-text'>
              <s>${data.price}</s>
              <br></br>sold out!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
