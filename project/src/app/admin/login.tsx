'use client';

import { useState } from 'react';
import { login } from './actions';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await login(formData);
    setLoading(false);
  }

  return (
    <div className='py-20'>
      <form action={handleSubmit} className='space-y-4'>
        <div className='mx-auto max-w-screen-md px-4 py-8 lg:py-16'>
          <label
            className='mb-2 block text-lg font-bold text-df-text'
            htmlFor='email'
          >
            Email:
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-2xl text-df-text shadow-sm'
            required
          />

          <label
            className='mb-2 block text-lg font-bold text-df-text'
            htmlFor='password'
          >
            Password:
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className='focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-2xl text-df-text shadow-sm'
            required
          />
          <div className='py-4'>
            <button
              disabled={loading}
              className='rounded-lg bg-df-text px-4 py-2 font-semibold hover:bg-blue-300'
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
