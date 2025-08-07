import Image from 'next/image';
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
            <h1 className='text-6xl font-light tracking-tight sm:text-7xl'>
              about
            </h1>

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

            <div className='flex flex-col items-start self-start px-4'>
              <p className='text-lg font-light'>kelly slater</p>
              <p className='text-lg font-light'>she/her</p>
              <p className='text-lg font-light'>ceramicist</p>
              <p className='text-lg font-light'>nyc</p>
            </div>

            <div className='max-w-lg space-y-6 px-4 pt-8'>
              <p className='text-base font-light leading-relaxed sm:text-lg'>
                i first started working with clay in highschool and then pottery
                quickly became an obsession in college. i fell in love with the
                medium when i started to create both functional and
                nonfunctional things for myself. soon enough, i had so much
                pottery in my home, that i needed to share it with others.
              </p>
              <p className='text-base font-light leading-relaxed sm:text-lg'>
                i currently produce small batches of my work and list them here
                on my website when they are finished. i also offer the option to
                commission me for custom work and large batch items at a
                wholesale rate. be sure to sign up for my newsletter so you know
                when I restock and if anything else exciting happens!
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className='hidden md:flex md:items-start md:gap-4'>
            {/* Vertical Title - aligned to top */}
            <h1 className='flex-shrink-0 text-8xl -tracking-widest [text-orientation:mixed] [writing-mode:sideways-lr] lg:text-9xl'>
              about
            </h1>

            {/* Left Column - Image and Button */}
            <div className='flex flex-col items-center space-y-6'>
              {/* Profile Image */}
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

              {/* Shop Button - underneath image */}
              <Button
                href='/shop'
                variant='outline'
                size='large'
                className='hover:shadow-lg'
              >
                shop
              </Button>
            </div>

            {/* Right Column - Content */}
            <div className='max-w-2xl flex-1 space-y-8'>
              {/* Bio Points - aligned left */}
              <div className='flex flex-col items-start'>
                <p className='text-xl font-light leading-4 tracking-tighter lg:text-2xl'>
                  kelly slater
                </p>
                <p className='text-xl font-light leading-4 tracking-tighter lg:text-2xl'>
                  she/her
                </p>
                <p className='text-xl font-light leading-4 tracking-tighter lg:text-2xl'>
                  ceramicist
                </p>
                <p className='text-xl font-light leading-4 tracking-tighter lg:text-2xl'>
                  nyc
                </p>
              </div>

              {/* Main Content - positioned lower */}
              <div className='space-y-6 pt-96'>
                <p className='text-lg font-light leading-4 tracking-tighter lg:text-xl'>
                  i first started working with clay in highschool and then
                  pottery quickly became an obsession in college. i fell in love
                  with the medium when i started to create both functional and
                  nonfunctional things for myself. soon enough, i had so much
                  pottery in my home, that i needed to share it with others.
                </p>
                <p className='text-lg font-light leading-4 tracking-tighter lg:text-xl'>
                  i currently produce small batches of my work and list them
                  here on my website when they are finished. i also offer the
                  option to commission me for custom work and large batch items
                  at a wholesale rate. be sure to sign up for my newsletter so
                  you know when I restock and if anything else exciting happens!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Card - Fixed positioning */}
      <div>
        <SocialMediaCard />
      </div>
    </section>
  );
}
