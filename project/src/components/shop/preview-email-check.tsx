'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import Loading from '@/app/shop/loading';

export default function EnterEmail() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  async function submit() {
    const res = await fetch('/shop/api/email/set-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (data.ok) {
      router.push('/shop/previews');
    } else {
      alert('Email not recognized');
    }
  }

  return (
    <div className='mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center gap-4 py-28'>
      <h1 className='text-center text-4xl text-black'>
        email subscribers get the first look.
      </h1>
      <p className='text-center text-4xl text-black'>
        verify your email below to get access
      </p>
      <Input
        type='email'
        placeholder='hello@example.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='text-black'
      />
      <button
        className='w-full rounded-3xl border border-black bg-df-yellow px-4 py-2 text-xl text-black transition-colors duration-200 hover:bg-dfNew2'
        onClick={submit}
      >
        Continue
      </button>
    </div>
  );
}
