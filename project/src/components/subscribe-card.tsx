'use client';

import { useState } from 'react';
import Image from 'next/image';
import { validateEmail } from '@/lib/utils';

export default function SubscribeCard() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address. Thank you!');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/shop/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(
            `too many subscription attempts. please try again in ${data.resetInMinutes} minutes.`
          );
        }
        throw new Error(`Failed to send email`);
      }
      if (data !== null) {
        setSubmitted(true);
        setError(null);
      }
    } catch (error) {
      console.log('Email error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mx-auto flex h-full w-full flex-col rounded-lg bg-dfNew p-6'>
      <div className='mb-auto justify-items-center space-y-8 text-center'>
        <h2 className='mb-2 text-xl text-white'>subscribe</h2>
      </div>
      <div className='flex justify-center'>
        <Image
          src='/mail-white.svg'
          alt='Envelope icon'
          width={100}
          height={100}
          placeholder='blur'
          blurDataURL='/mail-white.svg'
          unoptimized
        />
      </div>
      <div className='my-auto py-4 text-center'></div>
      {submitted ? (
        <div className='rounded-md bg-green-50 px-6 py-4 text-center'>
          <p className='font-medium text-green-600'>thanks for subscribing!</p>
          <p className='mt-1 text-sm text-green-600'>
            we&apos;ll keep you updated with the latest news
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <div className='relative'>
              <input
                type='text'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(() => e.target.value);
                }}
                placeholder='name@example.com'
                className='w-full rounded-md border border-gray-300 px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isLoading}
              />
            </div>
            {error && <p className='text-red-600'>{error}</p>}
          </div>
          <button
            type='submit'
            className='mt-4 flex w-full justify-center rounded-md bg-dfNew2 px-4 py-3 text-dfNew transition duration-300 ease-in-out hover:bg-dfNew hover:text-white'
            disabled={isLoading}
          >
            {isLoading ? (
              <div className='flex items-center'>
                <svg
                  className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                processing...
              </div>
            ) : (
              'subscribe now'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
