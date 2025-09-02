'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [status, setStatus] = useState<
    'loading' | 'success' | 'error' | 'missing'
  >('loading');

  useEffect(() => {
    if (!email) {
      setStatus('missing');
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `/shop/api/email/unsubscribe?email=${encodeURIComponent(email)}`,
          {
            method: 'POST',
          }
        );
        setStatus(res.ok ? 'success' : 'error');
      } catch (e) {
        console.error('Fetch error:', e);
        setStatus('error');
      }
    })();
  }, [email]);

  return (
    <main className='mx-auto min-h-screen max-w-md py-20 text-center text-black'>
      {status === 'loading' && <p>Unsubscribing…</p>}
      {status === 'success' && (
        <>
          <h1 className='mb-2 text-2xl font-semibold'>You’re unsubscribed</h1>
          <p className='text-black'>
            You’ve been removed from the Dragonfly Ceramics Newsletter.
          </p>
        </>
      )}
      {status === 'missing' && (
        <>
          <h1 className='mb-2 text-2xl font-semibold'>Invalid link</h1>
          <p className='text-gray-600'>Missing email parameter.</p>
        </>
      )}
      {status === 'error' && (
        <>
          <h1 className='mb-2 text-2xl font-semibold'>Oops</h1>
          <p className='text-gray-600'>
            Something went wrong. Please try again later.
          </p>
        </>
      )}
    </main>
  );
}
