'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { validateEmail } from '@/lib/utils';

export default function ConsultingForm() {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const businessNameRef = useRef('');
  const preferredDateRef = useRef('');
  const messageRef = useRef('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current,
      email: emailRef.current,
      businessName: businessNameRef.current,
      preferredDate: preferredDateRef.current,
      message: messageRef.current,
    };

    if (!validateEmail(formData.email)) {
      setError('Invalid email address. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/shop/api/email/consulting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(
            `Too many contact attempts. Please try again in ${data.resetInMinutes} minutes.`
          );
        }
        throw new Error(`Failed to send Contact Form email.`);
      }

      if (data !== null) {
        setSubmitted(true);
        setError(null);
      }
    } catch (error) {
      console.log('Contact email error', error);
      setError('Failed to send your message. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='relative text-center md:p-40'>
        <p className='text-6xl tracking-[-0.04em] text-black'>submitted!</p>
        <p className='mt-1 text-lg tracking-[-0.04em] text-black'>
          thanks for submitting the form! i will get back to you as soon as i
          can!
        </p>

        <div className='relative w-full overflow-hidden'>
          <Image
            src='/contact-mug-unoptimized.png'
            width={600}
            height={200}
            alt='Dragonfly Ceramics Mug - Handcrafed Pottery'
            priority
            className='contrast-105 ml-auto brightness-105 filter'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen w-full overflow-x-hidden bg-df-yellow text-black'>
      <div className='relative flex min-h-screen flex-col items-center justify-between lg:flex-row'>
        <div className='absolute left-0 top-0 w-full overflow-hidden leading-[0]'>
          <svg
            data-name='Layer 2'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className='relative block h-[900px] w-[calc(137%+1.3px)]'
          >
            <path
              d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z'
              className='fill-white'
            ></path>
          </svg>
        </div>
        <div className='z-10 flex-1 p-10'>
          <h1 className='mb-2 text-7xl tracking-[-0.04em] md:text-8xl'>
            consulting
          </h1>
          <div className='max-w-xl p-2'>
            <h4 className='mb-6 text-xl font-light leading-none tracking-[-0.04em]'>
              {
                'Do you have questions about growing your brand on social media? Need guidance on your ceramic or art focused business? You can fill out this form for consultations! This meeting will happen over video call and the rate is $75 per hour. Usually everything is covered in an hour but be sure to come with questions for me or please send me your questions before hand so I can be prepared! '
              }
            </h4>
            <p className='mb-6 text-xl font-light leading-none tracking-[-0.04em]'>
              Note: Filling out this form does not sign you up for a time slot,
              once filled out you will be sent an email to figure out details!
            </p>
          </div>
          <div className='flex flex-col gap-24 md:flex-row'>
            <div className='flex-1'>
              <form
                onSubmit={handleSubmit}
                className='w-full max-w-4xl space-y-6'
              >
                <div>
                  <label
                    htmlFor='name'
                    className='mb-1 block text-xl font-light'
                  >
                    name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    defaultValue=''
                    onChange={(e) => (nameRef.current = e.target.value)}
                    disabled={isLoading}
                    required
                    className='w-full rounded-lg border border-dfNew px-4 py-2 text-lg text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='mb-1 block text-xl font-light'
                  >
                    email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    defaultValue=''
                    onChange={(e) => (emailRef.current = e.target.value)}
                    disabled={isLoading}
                    required
                    className='w-full rounded-lg border border-dfNew px-4 py-2 text-lg text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label
                    htmlFor='businessName'
                    className='mb-1 block text-xl font-light'
                  >
                    business name/social media handles
                  </label>
                  <input
                    type='text'
                    id='businessName'
                    name='businessName'
                    defaultValue=''
                    onChange={(e) => (businessNameRef.current = e.target.value)}
                    disabled={isLoading}
                    required
                    className='w-full rounded-lg border border-dfNew px-4 py-2 text-lg text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label
                    htmlFor='preferredDate'
                    className='mb-1 block text-xl font-light'
                  >
                    preferred date/time
                  </label>
                  <input
                    id='preferredDate'
                    name='preferredDate'
                    type='datetime-local'
                    defaultValue=''
                    onChange={(e) =>
                      (preferredDateRef.current = e.target.value)
                    }
                    disabled={isLoading}
                    required
                    className='w-full rounded-lg border border-dfNew px-4 py-2 text-lg text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='mb-1 block text-xl font-light'
                  >
                    message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    defaultValue=''
                    onChange={(e) => (messageRef.current = e.target.value)}
                    disabled={isLoading}
                    required
                    rows={4}
                    className='w-full rounded-lg border border-dfNew px-4 py-2 text-lg text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                {error && <p className='mt-2 text-red-600'>{error}</p>}

                <button
                  type='submit'
                  disabled={isLoading}
                  className='group relative inline-flex transform items-center justify-center overflow-hidden rounded-3xl border border-black bg-white px-6 py-2 text-xl font-light text-black transition-all duration-300 hover:bg-dfNew2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                >
                  {isLoading ? (
                    <div className='flex items-center justify-center'>
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
                    <>
                      <span className='relative z-10'>submit</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='mt-12 flex flex-1 items-end justify-end overflow-hidden lg:mt-0'>
          <Image
            src='/consulting-page.png'
            width={800}
            height={800}
            alt='Dragonfly Ceramics Oil Dispenser - Handcrafted Pottery'
            priority
            unoptimized
            className='contrast-105 h-auto w-full rotate-[40deg] object-cover brightness-105'
          />
        </div>
      </div>
    </div>
  );
}
