import Image from 'next/image';
import { Button } from './shop/shop-button';

function LandinPageVideo() {
  return (
    <div className='absolute inset-0 h-full w-full overflow-hidden'>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        className='h-full w-full object-cover'
      >
        <source
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/content/videos/df-video-compressed.mp4`}
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className='relative min-h-screen w-full'>
      <LandinPageVideo />
      <div className='absolute inset-0 mx-8 flex flex-col items-center justify-center'>
        <Image
          src='/df-logo-text-new.png'
          alt='Dragonfly Ceramics'
          width={1000}
          height={800}
          className='mb-4 md:absolute md:bottom-0 md:left-0'
          placeholder='blur'
          blurDataURL='/dragonfly-text-white.png'
          unoptimized
        />
        <div className='absolute bottom-8 right-0'>
          <Button href={'/shop'} variant={'default'} size={'large'}>
            shop
          </Button>
        </div>
      </div>
    </div>
  );
}
