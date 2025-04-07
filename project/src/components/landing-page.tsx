import ShopLink from '@/components/shop/shop-link';
import Image from 'next/image';

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
    <div className='relative h-screen w-full'>
      <LandinPageVideo />
      <div className='absolute inset-0 mx-8 flex flex-col items-center justify-center'>
        <Image
          src='/dragonfly-text-white.png'
          alt='Dragonfly Ceramics'
          width={600}
          height={400}
          className='mb-4'
          placeholder='blur'
          blurDataURL='/dragonfly-text-white.png'
        />
        <ShopLink label={'shop now'} />
      </div>
    </div>
  );
}
