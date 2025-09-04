'use client';

import { useState } from 'react';
import { validateEmail } from '@/lib/utils';
import { Input } from './ui/input';

export default function SubscribeCard({ text }: { text: string }) {
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
    <div>
      <div className='text-center'>
        <h2 className='text-6xl tracking-[-0.04em] md:text-8xl'>{text}</h2>
        <p className='text-xl tracking-[-0.04em]'>
          sign up for the mailing list
        </p>
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
          <div className='flex justify-center'>
            <div className='relative w-full max-w-lg'>
              <Input
                id='email'
                type='text'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(() => e.target.value);
                }}
                placeholder='name@example.com'
                className='m-2 w-full p-6'
                disabled={isLoading}
              />
              <button
                type='submit'
                className='absolute right-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-yellow-100 px-4 text-sm text-black transition-colors hover:bg-yellow-100/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <svg
                      className='-ml-1 mr-2 h-4 w-4 animate-spin text-black'
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
                    sending...
                  </div>
                ) : (
                  'subscribe'
                )}
              </button>
            </div>
          </div>
          {error && <p className='mt-2 text-center text-red-600'>{error}</p>}
        </form>
      )}
    </div>
  );
}
