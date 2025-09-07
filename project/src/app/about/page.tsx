import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shop/shop-button';
import { SocialMediaCard } from '@/components/socialmedia';

export default function About() {
  return (
    <section className='mx-auto min-h-screen bg-df-yellow py-20 tracking-[-0.04em] text-black'>
      <div className='absolute left-0 top-0 w-full overflow-hidden leading-[0]'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='relative block h-[500px] w-[calc(170%+1.3px)] lg:h-[800px]'
        >
          <path
            d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z'
            className='fill-white'
          ></path>
        </svg>
      </div>
      <div className='relative z-10 grid grid-cols-4 gap-2 lg:grid-cols-5 xl:grid-cols-8'>
        <div className='flex justify-end'>
          <div className='flex flex-col -space-y-8 md:mx-2 md:-space-y-16'>
            <p className='-rotate-90 text-6xl md:text-9xl'>t</p>
            <p className='-rotate-90 text-6xl md:text-9xl'>u</p>
            <p className='-rotate-90 text-6xl md:text-9xl'>o</p>
            <p className='-rotate-90 text-6xl md:text-9xl'>b</p>
            <p className='-rotate-90 text-6xl md:text-9xl'>a</p>
          </div>
        </div>
        <div className='bg-black'>
          <Image
            src='/about-kelly-redesign.png'
            alt='Kelly Slater, Owner, Dragonfly Ceramics'
            width={200}
            height={800}
            unoptimized
          />
        </div>
        <div className='col-span-2 mr-4 flex flex-col justify-items-start lg:col-span-3'>
          <div className='flex h-full max-w-md flex-col justify-start'>
            <Image
              src='/kelly-name.png'
              width={150}
              height={150}
              alt='Kelly Slater'
              unoptimized
              className='-mx-5'
            />
            <p className='-mt-2 text-sm md:text-xl'>she/her</p>
            <p className='-mt-2 text-sm md:text-xl'>ceramicist</p>
            <p className='-mt-2 text-sm md:text-xl'>nyc</p>
            <div className='flex h-full flex-col justify-end gap-4'>
              <p className='text-xs font-light leading-none tracking-[-0.04em] md:text-2xl'>
                dragonfly ceramics started in 2025 and we focus on handmade
                functional ceramics for the home with an emphasis on unique
                colors.
              </p>
              <p className='text-xs font-light leading-none tracking-[-0.04em] md:text-2xl'>
                after getting a degree in filmmaking and ceramics, kelly
                combined her knowledge in the two mediums creating frequent
                social content and consistently releasing new ceramic work.
              </p>
              <p className='text-xs font-light leading-none tracking-[-0.04em] md:text-2xl'>
                check out @dragonflyceramics on
                <Link
                  href='https://www.instagram.com/dragonflyceramics_/'
                  className='hover:underline'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {' '}
                  instagram
                </Link>
                ,
                <Link
                  href='https://www.tiktok.com/@dragonflyceramics'
                  className='hover:underline'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {' '}
                  tiktok
                </Link>
                , and
                <Link
                  href='https://www.youtube.com/@dragonflyceramics'
                  className='hover:underline'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {' '}
                  youtube!
                </Link>
              </p>
              <p className='text-xs font-light leading-none tracking-[-0.04em] md:text-2xl'>
                for press and inquires
                <Link href='/contact' className='font-bold hover:underline'>
                  {' '}
                  contact the studio.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className='col-start-2 flex justify-center pt-2'>
          <Button href='/shop' variant='outline' className='hover:shadow-lg'>
            shop
          </Button>
        </div>
      </div>
      <div className='relative z-10'>
        <SocialMediaCard />
      </div>
    </section>
  );
}
