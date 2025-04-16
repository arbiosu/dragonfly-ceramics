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
    <div className='text-df-text'>
      <div className='relative mx-auto aspect-square w-full max-w-2xl'>
        <NextImageWrapper
          url={memoizedImages[selectedImageIndex]}
          altText={`Product Image #${selectedImageIndex}`}
          sizeProps='(max-width: 768px) 100vw, 50vw'
        />
      </div>
      {memoizedImages.length > 1 && (
        <div className='mt-4 flex items-center justify-center space-x-4'>
          <button
            onClick={() => handleChangeImage('prev')}
            className='rounded-full bg-dfNew p-2 text-white hover:bg-dfNew2 hover:text-df-text focus:outline-none focus:ring-2 focus:ring-df-text'
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
          <div className='text-sm'>
            {selectedImageIndex + 1} / {images.length}
          </div>
          <button
            onClick={() => handleChangeImage('next')}
            className='rounded-full bg-dfNew p-2 text-white hover:bg-dfNew2 hover:text-df-text focus:outline-none focus:ring-2 focus:ring-df-text'
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
