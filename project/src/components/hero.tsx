import Image from 'next/image';
import SubscribeCard from '@/components/subscribe-card';

export default function Hero() {
  return (
    <section className='grid min-h-[100dvh] w-full text-df-text md:grid-cols-2'>
      <div className='relative order-2 min-h-[50vh] md:order-1 md:min-h-[100dvh]'>
        <Image
          src='/pottery.jpg'
          alt='Dragonfly Ceramics Art'
          fill
          className='object-cover'
          placeholder='blur'
          blurDataURL='/pottery.jpg'
        />
      </div>
      <div className='order-1 flex min-h-[50vh] items-center justify-center p-6 md:order-2 md:min-h-[100dvh] md:p-12 lg:p-16'>
        <div className='flex max-w-md flex-col gap-8'>
          <div className='space-y-4'>
            <h2 className='text-3xl tracking-tight text-df-text sm:text-4xl md:text-5xl lg:text-6xl'>
              all handmade pottery, crafted with love
            </h2>
            <p className='text-lg font-medium text-df-text'>
              sign up for the mailing list and never miss an update
            </p>
          </div>
          <SubscribeCard />
        </div>
      </div>
    </section>
  );
}
