'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQ[];
}

export function FAQHorizontalScroll({ faqs }: FAQProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className='mx-auto w-full max-w-7xl py-6'>
      <h2 className='mb-6 text-center text-2xl text-df-text'>
        frequently asked questions
      </h2>
      <div
        ref={scrollRef}
        className='relative flex flex-nowrap overflow-x-auto px-2 py-4'
      >
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className='mr-4 inline-block w-96 flex-shrink-0 p-6 align-top last:mr-0'
          >
            <h3 className='mb-3 text-lg text-dfNew'>
              {faq.question.toLowerCase()}
            </h3>
            <p className='text-dfNew'>{faq.answer.toLowerCase()}</p>
          </div>
        ))}
      </div>
      {/* Buttons */}
      <div className='mt-6 flex justify-between'>
        <button
          onClick={scrollLeft}
          className='rounded-full bg-dfNew2 p-2 shadow-md hover:bg-blue-300'
          aria-label='Scroll left'
        >
          <Image
            src='/chevron-left.svg'
            alt='Left arrow icon'
            width={48}
            height={48}
          />
        </button>
        <button
          onClick={scrollRight}
          className='rounded-full bg-dfNew2 p-2 shadow-md hover:bg-blue-300'
          aria-label='Scroll left'
        >
          <Image
            src='/chevron-right.svg'
            alt='Right arrow icon'
            width={48}
            height={48}
          />
        </button>
      </div>
    </div>
  );
}

export default function FAQCarousel({ faqs }: FAQProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const visibleFaqs = faqs.slice(currentIndex, currentIndex + 3);

  const handlePrevious = () => {
    setCurrentIndex(() => Math.max(0, currentIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex(() => Math.min(faqs.length - 3, currentIndex + 3));
  };

  return (
    <div className='mx-auto w-full max-w-6xl py-6'>
      <h2 className='mb-6 text-center text-2xl text-df-text'>
        Frequently Asked Questions
      </h2>
      <div className='relative'>
        <div className='flex gap-6 overflow-hidden py-4'>
          {visibleFaqs.map((faq) => (
            <div
              key={faq.id}
              className='min-w-0 flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg'
            >
              <h3 className='mb-3 text-lg font-semibold text-df-text'>
                {faq.question}
              </h3>
              <p className='text-df-text'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 flex justify-between md:mt-0'>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`relative z-10 rounded-full bg-white p-2 shadow-md ${currentIndex === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-300'}`}
          aria-label='Previous FAQS'
        >
          <Image
            src='/chevron-left.svg'
            alt='Left arrow icon'
            width={48}
            height={48}
          />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= faqs.length - 1}
          className={`relative z-10 rounded-full bg-white p-2 shadow-md ${currentIndex >= faqs.length - 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-300'}`}
          aria-label='Next FAQS'
        >
          <Image
            src='/chevron-right.svg'
            alt='Right arrow icon'
            width={48}
            height={48}
          />
        </button>
      </div>
      <div className='mt-6 flex justify-center gap-2'>
        {Array.from({ length: Math.ceil(faqs.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={`h-2 w-8 rounded-full ${currentIndex / 3 === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
