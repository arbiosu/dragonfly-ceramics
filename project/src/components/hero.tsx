import Image from 'next/image';
import SubscribeCard from '@/components/subscribe-card';
import { Button } from './shop/shop-button';

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

export function HeroSection() {
  return (
    <section className='relative min-h-screen w-full overflow-hidden'>
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-between lg:flex-row'>
        <div className='flex-1 space-y-8 px-6 text-center lg:pr-12 lg:text-left'>
          <div>
            <h1 className='text-7xl tracking-tight text-black md:text-8xl lg:text-9xl'>
              <span className='block'>crafted</span>
              <span className='block'>with love</span>
            </h1>
          </div>

          <div className='flex justify-center lg:justify-start'>
            <div className='group relative'>
              <Image
                src='/hand-made-in-nyc.png'
                alt='Handmade in NYC'
                height={300}
                width={300}
                unoptimized
              />
            </div>
          </div>

          <div>
            <Button
              href={'/shop'}
              variant={'outline'}
              size={'large'}
              className='group relative transform overflow-hidden border-2 border-stone-800 bg-transparent px-12 py-4 text-lg font-medium text-stone-800 transition-all duration-300 hover:scale-105 hover:bg-stone-800 hover:text-white hover:shadow-2xl'
            >
              <span className='relative z-10'>shop</span>
              <div className='absolute inset-0 origin-left scale-x-0 transform bg-stone-800 transition-transform duration-300 group-hover:scale-x-100'></div>
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className='relative mt-12 max-w-2xl flex-1 lg:mt-0'>
          <div className='group relative'>
            {/* Main image */}
            <div className='relative overflow-hidden'>
              <Image
                src='/df-hero-new-compressed.png'
                width={800}
                height={600}
                alt='Dragonfly Ceramics Bowl - Handcrafted pottery'
                className='contrast-105 h-auto w-full object-cover brightness-105 filter'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
