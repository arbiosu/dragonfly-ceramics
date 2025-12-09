// source: https://flowbite.com/docs/components/banner/

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Banner() {
  const [isAlt, setIsAlt] = useState(false);

  const toggleBanner = () => setIsAlt((prev) => !prev);

  return (
    <div
      id='sticky-banner'
      tabIndex={-1}
      className={`fixed start-0 top-0 z-50 flex h-12 w-full justify-between ${isAlt ? 'bg-df-yellow' : 'bg-dfNew2'}`}
    >
      <div className='flex items-center'>
        <button
          data-dismiss-target='#sticky-banner'
          type='button'
          onClick={() => toggleBanner()}
          className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg p-1.5 text-sm text-black hover:bg-gray-200'
        >
          <svg
            className='h-3 w-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 2l-4 5 4 5'
            />
          </svg>
          <span className='sr-only'>Close banner</span>
        </button>
      </div>
      <div className='mx-auto flex items-center'>
        <p className='flex items-center gap-8 text-sm tracking-[-0.04em] text-black'>
          <span className='text-sm md:text-xl'>
            {isAlt ? "don't miss the drop!" : "don't miss a thing!"}
          </span>
          <span className='text-sm font-semibold tracking-[-0.04em] md:text-xl'>
            {isAlt ? 'next restock: 12/11' : ''}
          </span>
          <Link
            href='#subscribe'
            className={`text-sm tracking-[-0.04em] md:text-xl ${isAlt ? 'underline' : ''}`}
            prefetch={false}
          >
            {isAlt ? 'get on the email list' : 'sign up for the mailing list'}{' '}
            <span className='underline'>{isAlt ? '' : 'here'}</span>
          </Link>
        </p>
      </div>
      <div className='flex items-center'>
        <button
          data-dismiss-target='#sticky-banner'
          type='button'
          onClick={() => toggleBanner()}
          className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg p-1.5 text-sm text-black hover:bg-gray-200'
        >
          <svg
            className='h-3 w-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 2l4 5-4 5'
            />
          </svg>
          <span className='sr-only'>Close banner</span>
        </button>
      </div>
    </div>
  );
}
