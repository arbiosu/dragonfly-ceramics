import Image from 'next/image';
import { Button } from './shop/shop-button';

export function HeroSection() {
  return (
    <section className='relative w-full overflow-hidden'>
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-between md:flex-row'>
        <div className='flex-1 space-y-8 px-6 pt-2 text-center lg:pr-12 lg:text-left'>
          <div>
            <h1 className='text-7xl text-black md:text-8xl lg:text-9xl'>
              <span className='block tracking-[-0.04em]'>crafted</span>
              <span className='block tracking-[-0.04em]'>with love</span>
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

          <div className='mx-2'>
            <Button
              href={'/shop'}
              variant={'outline'}
              size={'large'}
              className='transition-all duration-300 hover:scale-105 hover:shadow-2xl'
            >
              <span className='relative z-10 text-2xl'>shop</span>
            </Button>
          </div>
        </div>

        <div className='relative mt-12 max-w-2xl lg:mt-0'>
          <div className='group relative'>
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
