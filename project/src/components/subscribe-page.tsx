import Image from 'next/image';
import SubscribeCard from './subscribe-card';

export default function SubscribePage() {
  return (
    <section className='bg-dfNew2 text-black'>
      <div className='leading-0 left-0 top-0 w-full overflow-hidden'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='relative block h-[340px] w-[calc(191%+1.3px)]'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className='fill-white'
          ></path>
        </svg>
      </div>
      <div className='p-6'>
        <SubscribeCard
          headingText={"don't miss a beat"}
          subText='sign up for the mailing list and never miss an update'
          subTextAlignment='text-center'
          subTextSize='text-xl'
        />
        <Image
          src='/logo-cropped-black.png'
          alt='Dragonfly Ceramics Logo Black'
          width={100}
          height={100}
          className='mx-auto p-6'
          unoptimized
        />
      </div>
    </section>
  );
}
