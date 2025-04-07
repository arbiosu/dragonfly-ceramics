/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { IMG_WIDTHS } from '@/lib/images/sharp';

interface ImageProps {
  url: string;
  alt: string;
  priority?: boolean;
  widths?: string[];
  className?: string;
  sizes?: string;
  external?: boolean
}

/**
 *
 * @param baseUrl string - without the extension, we will auto load 320-w and .webp files
 * @param alt string - the alt text for the photo
 * @param priority boolean - fetch the image at a high priority relative to other images. Defaults to false.
 * @param widths string[] - default to IMG_WIDTHS
 * @param className string - extend the img with a Tailwind utility
 *
 * @returns
 */
export default function CustomImage({
  url,
  alt,
  priority = false,
  external = false,
  widths = IMG_WIDTHS,
  className = "",
  sizes = '(max-width: 640px) 320px, (max-width: 960px) 640px, (max-width: 1280px) 960px, (max-width: 1920px) 1280px, 1920px',
}: ImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const source = `${url}-320w.webp`;
  const srcset = widths
    .map((width) => {
      return `${url}-${width}w.webp ${width}w`;
    })
    .join(', ');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
  }, [source]);

  return (
    <div className="relative">
      {isLoading && (
        <div
          className='absolute inset-0 animate-pulse rounded bg-background'
          aria-hidden={true}
        />
      )}
      {isError && (
        <div className='absolute inset-0 flex items-center justify-center rounded bg-background'>
          <span className='text-sm'>Failed to load image</span>
        </div>
      )}

      <img
        src={external ? url : source}
        loading='lazy'
        fetchPriority={priority ? 'high' : 'auto'}
        alt={alt}
        srcSet={external ? "" : srcset}
        sizes={sizes}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        decoding='async'
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
      />
    </div>
  );
}
