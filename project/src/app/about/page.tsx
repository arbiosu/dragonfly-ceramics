import Image from 'next/image';
import ShopLink from '@/components/shop/shop-link';
import { ImageGridItem } from '@/components/image-grid';
import { SocialMediaLinksCard } from '@/components/socialmedia';

export default function About() {
  return (
    <>
      <section className='md:py20 mx-auto bg-df-bg px-4 py-28'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div className='relative aspect-square bg-df-bg'>
            <Image
              src='/about-kelly-cropped.jpg'
              alt='Kelly Slater, Owner, Dragonfly Ceramics'
              fill
              className='bg-df-bg object-contain'
            />
          </div>
          <div className='space-y-8'>
            <div className='space-y-6'>
              <h2 className='text-center text-5xl text-df-text md:text-left'>
                meet the artist
              </h2>
              <p className='text-center text-2xl leading-relaxed text-df-text md:text-left'>
                kelly slater (she/her)
              </p>
              <p className='text-center text-lg italic leading-relaxed text-df-text md:text-left'>
                ceramicist
              </p>
              <p className='text-center text-lg italic leading-relaxed text-df-text md:text-left'>
                based in nyc
              </p>
              <p className='leading-relaxed text-df-text'>
                i first started working with clay in highschool and then pottery
                quickly became an obsession in college. i fell in love with the
                medium when i started to create both functional and
                nonfunctional things for myself. soon enough, i had so much
                pottery in my home, that i needed to share it with others.
              </p>
              <p className='leading-relaxed text-df-text'>
                i currently produce small batches of my work and list them here
                on my website when they are finished. i also offer the option to
                commission me for custom work and large batch items at a
                wholesale rate. be sure to sign up for my newsletter so you know
                when I restock and if anything else exciting happens!
              </p>
              <ShopLink label={'shop now'} />
            </div>
          </div>
        </div>
      </section>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
          <SocialMediaLinksCard />
          <ImageGridItem src='/pottery-hand.jpeg' alt='Grid image 2' />
        </div>
      </div>
    </>
  );
}
