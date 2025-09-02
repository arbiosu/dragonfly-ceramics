'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { validateEmail } from '@/lib/utils';

export default function ContactForm() {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const messageRef = useRef('');
  const sourceRef = useRef('');

  const [topic, setTopic] = useState('customOrder');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current,
      email: emailRef.current,
      topic: topic,
      message: messageRef.current,
      source: sourceRef.current,
    };

    if (!validateEmail(formData.email)) {
      setError('Invalid email address. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/shop/api/email/contact', {
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

  const getTopicInstructions = () => {
    switch (topic) {
      case 'customOrder':
        return (
          <div className='mb-4 rounded border-l-4 border-dfNew bg-dfNew2 p-4'>
            <h3 className='flex items-center font-medium text-dfNew'>
              custom order instructions
            </h3>
            <p className='mt-1 text-dfNew'>
              please include details about your desired design, size, colors,
              and any specific requirements. if possible, mention your preferred
              date of completion.
            </p>
          </div>
        );
      case 'wholesale':
        return (
          <div className='mb-4 rounded border-l-4 border-dfNew bg-dfNew2 p-4'>
            <h3 className='flex items-center font-medium text-dfNew'>
              wholesale order instructions
            </h3>
            <p className='mt-1 text-dfNew'>
              {`please include information about your business, the products you're interested in, estimated quantities,
              and your location. 
              times for production and shipping vary based on order size and custom requests.
              50% deposit is required for wholesale orders. the remaining balance will be due prior to shipment.
              returns and exchanges are only accepted if items are damaged in transit.`}
            </p>
          </div>
        );
      case 'general':
        return (
          <div className='mb-4 rounded border-l-4 border-dfNew bg-dfNew2 p-4'>
            <h3 className='flex items-center font-medium text-dfNew'>
              general inquiry
            </h3>
            <p className='mt-1 text-dfNew'>
              {`feel free to ask any questions about our products, shipping, returns, 
              or any other information you need. we'll get back to you as soon as possible.`}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className='relative text-center md:p-40'>
        <p className='text-6xl tracking-[-0.069em] text-black'>submitted!</p>
        <p className='mt-1 text-lg tracking-[-0.069em] text-black'>
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
    <div className='mx-auto text-black'>
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-between lg:flex-row'>
        <div className='flex-1 p-10'>
          <h1 className='mb-2 text-8xl tracking-[-0.069em]'>contact</h1>
          <div className='max-w-xl p-2'>
            <h4 className='mb-6 text-xl font-light leading-none tracking-[-0.069em]'>
              {
                "have a question about a piece or just want to say hi? i'm all ears. for general inquiries, brand collaborations, or custom wholesale orders - whether you're looking for handmade gifts for your team, ceramic dinnerware for your restaurant, or a large batch of unique pieces for a special event - please reach out using the form below."
              }
            </h4>
          </div>
          <div className='flex flex-col gap-24 md:flex-row'>
            {/* Form Section */}
            <div className='flex-1'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label
                    htmlFor='topic'
                    className='mb-1 block text-xl font-light'
                  >
                    topic
                  </label>
                  <select
                    id='topic'
                    name='topic'
                    value={topic}
                    onChange={handleTopicChange}
                    disabled={isLoading}
                    required
                    className='w-full rounded-lg border border-dfNew px-4 py-2 text-lg text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='' disabled>
                      select an option
                    </option>
                    <option value='customOrder'>custom order</option>
                    <option value='wholesale'>wholesale</option>
                    <option value='general'>general inquiry</option>
                  </select>
                </div>
                {topic && getTopicInstructions()}
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

                <div>
                  <label
                    htmlFor='source'
                    className='mb-1 block text-xl font-light'
                  >
                    how did you hear about me?
                  </label>
                  <select
                    id='source'
                    name='source'
                    defaultValue=''
                    onChange={(e) => (sourceRef.current = e.target.value)}
                    disabled={isLoading}
                    required
                    className='w-full rounded-lg border border-dfNew px-4 py-2 text-lg text-df-text focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='' disabled>
                      Select an option
                    </option>
                    <option value='family/friend'>Family/Friend</option>
                    <option value='tiktok'>TikTok</option>
                    <option value='instagram'>Instagram</option>
                    <option value='in person sales'>In Person Sales</option>
                    <option value='other'>Other</option>
                  </select>
                  {error && <p className='mt-2 text-red-600'>{error}</p>}
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='group relative inline-flex transform items-center justify-center overflow-hidden rounded-3xl border border-black bg-df-yellow px-6 py-2 text-xl font-light text-black transition-all duration-300 hover:scale-105 hover:bg-dfNew2 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
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

        <div className='relative right-0 mt-12 max-w-2xl flex-1 lg:mt-0'>
          <div className='group relative'>
            <div className='relative overflow-hidden'>
              <Image
                src='/contact-mug-unoptimized.png'
                width={800}
                height={800}
                className='contrast-105 h-auto w-full object-cover brightness-105 filter'
                alt='Dragonfly Ceramics Mug - Handcrafed Pottery'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
