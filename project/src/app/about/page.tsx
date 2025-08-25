import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shop/shop-button';
import { SocialMediaCard } from '@/components/socialmedia';

export default function About() {
  return (
    <section className='relative min-h-screen text-black'>
      {/* Main Content Container */}
      <div className='flex min-h-screen items-center justify-center px-4 py-24 pt-32 md:px-10'>
        <div className='w-full max-w-7xl'>
          {/* Mobile Layout */}
          <div className='flex flex-col items-center space-y-8 md:hidden'>
            <h1 className='text-6xl -tracking-widest sm:text-7xl'>about</h1>

            <div className='relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 opacity-75 blur'></div>
              <Image
                src='/about-kelly-redesign.png'
                alt='Kelly Slater, Owner, Dragonfly Ceramics'
                width={200}
                height={200}
                unoptimized
                className='relative object-cover shadow-xl'
                priority
              />
            </div>

            <div className='flex justify-center'>
              <Button
                href='/shop'
                variant='outline'
                size='large'
                className='hover:shadow-lg'
              >
                shop
              </Button>
            </div>

            <div className='max-w-lg space-y-6 px-4 pt-8'>
              <div className='space-y-0'>
                <p className='text-lg font-light leading-4 tracking-[-4%]'>
                  she/her
                </p>
                <p className='text-lg font-light leading-4 tracking-[-4%]'>
                  ceramicist
                </p>
                <p className='text-lg font-light leading-4 tracking-[-4%]'>
                  nyc
                </p>
              </div>

              <p className='text-base font-light leading-4 tracking-[-4%]'>
                dragonfly ceramics started in 2025 and we focus on handmade
                functional ceramics for the home with an emphasis on unique
                colors.
              </p>
              <p className='text-base font-light leading-4 tracking-[-4%]'>
                after getting a degree in filmmaking and ceramics, kelly
                combined her knowledge in the two mediums creating frequent
                social content and while striving to constantly learn and
                perfect her ceramic abilities.
              </p>
              <p className='text-base font-light leading-none tracking-[-4%] sm:text-lg'>
                check out @dragonflyceramics on{' '}
                <Link
                  href='https://www.instagram.com/dragonflyceramics_/'
                  className='hover:underline'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  instagram
                </Link>
                ,{' '}
                <Link
                  href='https://www.tiktok.com/@dragonflyceramics'
                  className='hover:underline'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  tiktok
                </Link>
                , and{' '}
                <Link
                  href='https://www.youtube.com/@dragonflyceramics'
                  className='hover:underline'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  youtube!
                </Link>
              </p>
              <p className='text-base font-light leading-none tracking-[-4%]'>
                for press and inquires{' '}
                <Link href='/contact' className='font-bold hover:underline'>
                  contact the studio.
                </Link>
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className='hidden md:flex md:items-start md:gap-4'>
            <h1 className='flex-shrink-0 text-8xl -tracking-widest [text-orientation:mixed] [writing-mode:sideways-lr] lg:text-9xl'>
              about
            </h1>

            <div className='flex flex-col items-center space-y-6'>
              <div className='relative flex-shrink-0'>
                <div className='absolute -inset-2 bg-gradient-to-r from-neutral-200 to-neutral-300 opacity-75 blur'></div>
                <Image
                  src='/about-kelly-redesign.png'
                  alt='Kelly Slater, Owner, Dragonfly Ceramics'
                  width={250}
                  height={250}
                  unoptimized
                  className='relative object-cover shadow-xl'
                  priority
                />
              </div>

              <Button
                href='/shop'
                variant='outline'
                size='large'
                className='hover:shadow-lg'
              >
                shop
              </Button>
            </div>

            <div className='max-w-2xl flex-1 space-y-8'>
              <div className='flex flex-col items-start lg:-space-y-2'>
                <p className='text-xl leading-4 tracking-[-4%] lg:text-2xl'>
                  she/her
                </p>
                <p className='text-xl leading-4 tracking-[-4%] lg:text-2xl'>
                  ceramicist
                </p>
                <p className='text-xl leading-4 tracking-[-4%] lg:text-2xl'>
                  nyc
                </p>
              </div>

              <div className='max-w-md space-y-6 pt-60'>
                <p className='text-2xl font-light leading-none tracking-[-4%]'>
                  {' '}
                  dragonfly ceramics started in 2025 and we focus on handmade
                  functional ceramics for the home with an emphasis on unique
                  colors.
                </p>
                <p className='text-2xl font-light leading-none tracking-[-4%]'>
                  {' '}
                  after getting a degree in filmmaking and ceramics, kelly
                  combined her knowledge in the two mediums creating frequent
                  social content and while striving to constantly learn and
                  perfect her ceramic abilities.
                </p>
                <p className='text-2xl font-light leading-none tracking-[-4%]'>
                  check out @dragonflyceramics on{' '}
                  <Link
                    href='https://www.instagram.com/dragonflyceramics_/'
                    className='hover:underline'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    instagram
                  </Link>
                  ,{' '}
                  <Link
                    href='https://www.tiktok.com/@dragonflyceramics'
                    className='hover:underline'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    tiktok
                  </Link>
                  , and{' '}
                  <Link
                    href='https://www.youtube.com/@dragonflyceramics'
                    className='hover:underline'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    youtube!
                  </Link>
                </p>
                <p className='text-2xl font-light leading-none tracking-[-4%]'>
                  for press and inquires{' '}
                  <Link href='/contact' className='font-bold hover:underline'>
                    contact the studio.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SocialMediaCard />
      </div>
    </section>
  );
}
