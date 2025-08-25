import Image from 'next/image';
import { Button } from './shop/shop-button';

export function HeroSection() {
  return (
    <section className='relative min-h-screen w-full overflow-hidden -tracking-widest'>
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-between lg:flex-row'>
        <div className='flex-1 space-y-8 px-6 text-center lg:pr-12 lg:text-left'>
          <div>
            <h1 className='text-7xl text-black md:text-8xl lg:text-9xl'>
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
              <span className='relative z-10 text-2xl'>shop</span>
              <div className='absolute inset-0 origin-left scale-x-0 transform bg-stone-800 transition-transform duration-300 group-hover:scale-x-100'></div>
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className='relative mt-12 max-w-2xl flex-1 lg:mt-0'>
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
