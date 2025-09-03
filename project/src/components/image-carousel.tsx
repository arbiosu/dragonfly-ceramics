'use client';

import { useState, useMemo } from 'react';
import { NextImageWrapper } from './image';

export default function ImageCarousel({ images }: { images: string[] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const memoizedImages = useMemo(() => images, [images]);

  const handleChangeImage = (direction: 'next' | 'prev') => {
    setSelectedImageIndex((prevIndex) => {
      if (direction === 'next') {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div className='text-black'>
      <div className='relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-3xl border border-black p-4'>
        <NextImageWrapper
          url={memoizedImages[selectedImageIndex]}
          altText={`Product Image #${selectedImageIndex}`}
          sizeProps='(max-width: 768px) 100vw, 256px'
        />
      </div>
      {memoizedImages.length > 1 && (
        <div className='mt-4 flex items-center justify-center space-x-4'>
          <button
            onClick={() => handleChangeImage('prev')}
            className='rounded-2xl border border-black px-4 py-2 text-black hover:bg-dfNew2 focus:outline-none focus:ring-2 focus:ring-df-text'
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
          <div className='text-lg font-light tracking-[-0.04em]'>
            {selectedImageIndex + 1} / {images.length}
          </div>
          <button
            onClick={() => handleChangeImage('next')}
            className='rounded-2xl border border-black px-4 py-2 text-black hover:bg-dfNew2 focus:outline-none focus:ring-2 focus:ring-df-text'
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
  );
}
