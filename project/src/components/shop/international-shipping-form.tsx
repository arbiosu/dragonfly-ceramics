'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { validateEmail } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const inputTextClass =
  'w-full border rounded-lg border-black  px-4 py-2 text-black focus:border-transparent focus:outline-none focus:ring-1 focus:ring-dfNew';
const labelClass = 'mb-1 block text-lg text-black tracking-[-0.04em]';

export function InternationShippingForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const firstNameRef = useRef<string>('');
  const lastNameRef = useRef<string>('');
  const emailRef = useRef<string>('');
  const phoneNumberRef = useRef<string>('');
  const street1Ref = useRef<string>('');
  const street2Ref = useRef<string>('');
  const cityRef = useRef<string>('');
  const stateRef = useRef<string>('');
  const zipRef = useRef<string>('');
  const countryRef = useRef<string>('');

  const { cartItems } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name: firstNameRef.current + ' ' + lastNameRef.current,
      email: emailRef.current,
      phone: phoneNumberRef.current,
      street1: street1Ref.current,
      street2: street2Ref.current,
      city: cityRef.current,
      state: stateRef.current,
      zip: zipRef.current,
      country: countryRef.current,
      isResidential: true,
      validate: true,
    };

    if (!validateEmail(formData.email)) {
      setError('Invalid email address. Please try again.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/shop/api/international', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: formData, cartItems: cartItems }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(
            `Too many contact attempts. Please try again in ${data.resetInMinutes} minutes.`
          );
        }
        throw new Error('Failed to calculate international shipping');
      }
      if (data !== null) {
        setSubmitted(true);
        setError(null);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to submit your order. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='relative text-center md:p-40'>
        <p className='text-6xl tracking-[-0.04em] text-black'>submitted!</p>
        <p className='mt-1 text-lg tracking-[-0.04em] text-black'>
          thanks for submitting the form!{' '}
          <strong>
            if accepted, you will receive a secure payment link from
            dragonflyceramics.kelly@gmail.com.
          </strong>
          i will get back to you as soon as i can!
        </p>
      </div>
    );
  }

  return (
    <div className='text-black'>
      <div className='flex justify-center'>
        <Image
          src='/df-red-text.png'
          alt='Dragonfly Ceramics'
          width={600}
          height={400}
        />
      </div>

      <div className='container mx-auto'>
        <form onSubmit={handleSubmit} className='mx-auto w-full max-w-4xl px-4'>
          <h1 className='mb-2 text-3xl font-medium tracking-[-0.04em] md:text-6xl'>
            international shipping
          </h1>
          <h3 className='mb-2 text-lg tracking-[-0.04em]'>
            * indicates a required field
          </h3>
          <div className='grid grid-cols-1 gap-2'>
            <div className='space-y-4'>
              <div>
                <label htmlFor='firstName' className={labelClass}>
                  first name*
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  defaultValue=''
                  onChange={(e) => (firstNameRef.current = e.target.value)}
                  disabled={isLoading}
                  className={inputTextClass}
                  required
                />
              </div>
              <div>
                <label htmlFor='lastName' className={labelClass}>
                  last name*
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  defaultValue=''
                  onChange={(e) => (lastNameRef.current = e.target.value)}
                  disabled={isLoading}
                  className={inputTextClass}
                  required
                />
              </div>

              <div>
                <label htmlFor='email' className={labelClass}>
                  email*
                </label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  defaultValue=''
                  onChange={(e) => (emailRef.current = e.target.value)}
                  disabled={isLoading}
                  className={inputTextClass}
                  required
                />
              </div>

              <div>
                <label htmlFor='phoneNumber' className={labelClass}>
                  phone number*
                </label>
                <input
                  type='text'
                  id='phoneNumber'
                  name='phoneNumber'
                  defaultValue=''
                  onChange={(e) => (phoneNumberRef.current = e.target.value)}
                  disabled={isLoading}
                  className={inputTextClass}
                />
              </div>

              <div>
                <label htmlFor='street1' className={labelClass}>
                  street address line 1*
                </label>
                <input
                  type='text'
                  id='street1'
                  name='street1'
                  defaultValue=''
                  onChange={(e) => (street1Ref.current = e.target.value)}
                  disabled={isLoading}
                  className={inputTextClass}
                  required
                />
              </div>

              <div>
                <label htmlFor='street2' className={labelClass}>
                  street address line 2
                </label>
                <input
                  type='text'
                  id='street2'
                  name='street2'
                  defaultValue=''
                  onChange={(e) => (street2Ref.current = e.target.value)}
                  disabled={isLoading}
                  className={inputTextClass}
                />

                <div>
                  <label htmlFor='city' className={labelClass}>
                    city/locality*
                  </label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    defaultValue=''
                    onChange={(e) => (cityRef.current = e.target.value)}
                    disabled={isLoading}
                    className={inputTextClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='state' className={labelClass}>
                    state/province*
                  </label>
                  <input
                    type='text'
                    id='state'
                    name='state'
                    defaultValue=''
                    onChange={(e) => (stateRef.current = e.target.value)}
                    disabled={isLoading}
                    className={inputTextClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='zip' className={labelClass}>
                    postal code*
                  </label>
                  <input
                    type='text'
                    id='zip'
                    name='zip'
                    defaultValue=''
                    onChange={(e) => (zipRef.current = e.target.value)}
                    disabled={isLoading}
                    className={inputTextClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='country' className={labelClass}>
                    country*
                  </label>
                  <input
                    type='text'
                    id='country'
                    name='country'
                    defaultValue=''
                    onChange={(e) => (countryRef.current = e.target.value)}
                    disabled={isLoading}
                    className={inputTextClass}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <p className='mt-4 text-red-600'>{error}</p>}
          <div className='flex gap-4 p-10'>
            <Link
              href={isLoading ? '#' : '/shop/cart'}
              className={`rounded-3xl border border-black bg-df-yellow px-4 py-2 text-center text-xl tracking-[-0.04em] transition-colors duration-200 hover:bg-dfNew2 ${
                isLoading
                  ? 'pointer-events-none cursor-not-allowed opacity-50'
                  : ''
              }`}
            >
              back
            </Link>

            <button
              type='submit'
              className='flex-1 rounded-3xl border border-black bg-df-yellow px-4 py-2 text-xl tracking-[-0.04em] transition-colors duration-200 hover:bg-dfNew2 disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isLoading}
            >
              {isLoading ? 'processing...' : 'submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
