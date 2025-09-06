import Image from 'next/image';
import Link from 'next/link';

const socials = [
  {
    icon: '/tiktok.svg',
    thumbnail: '/tiktok.png',
    link: 'https://www.tiktok.com/@dragonflyceramics',
    alt: 'tiktok',
  },
  {
    icon: '/instagram.svg',
    thumbnail: '/instagram.png',
    link: 'https://www.instagram.com/dragonflyceramics_/',
    alt: 'instagram',
  },
  {
    icon: '/youtube.svg',
    thumbnail: '/youtube.png',
    link: 'https://www.youtube.com/@dragonflyceramics',
    alt: 'youtube',
  },
];

export default function SocialMediaLinks() {
  return (
    <div className='flex items-center justify-evenly space-x-8'>
      {socials.map((sm, i) => (
        <div key={i}>
          <Link
            href={sm.link}
            rel='noopener noreferrer'
            className='block transition-transform hover:scale-110 focus:scale-110'
            target='_blank'
          >
            <Image
              src={sm.icon}
              alt={sm.alt}
              width={48}
              height={48}
              placeholder='blur'
              blurDataURL={sm.icon}
              unoptimized
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export function SocialMediaCard() {
  return (
    <section className='w-full px-4 py-8'>
      <p className='mb-12 text-center text-6xl tracking-[-0.04em] lg:text-9xl'>
        socials
      </p>
      <div className='flex justify-center'>
        <div className='grid max-w-4xl grid-cols-3 justify-items-center gap-6 md:gap-20'>
          {socials.map((sm, i) => (
            <div key={i} className='flex flex-col items-center'>
              <Link
                href={sm.link}
                rel='noopener noreferrer'
                className='mb-4 block transition-transform hover:scale-110 focus:scale-110 active:scale-95'
                target='_blank'
              >
                <Image
                  src={sm.thumbnail}
                  alt={sm.alt}
                  width={600}
                  height={600}
                  className='h-24 w-24 rounded-full border border-black bg-white md:h-32 md:w-32'
                  unoptimized
                />
              </Link>
              <p className='text-center text-lg md:text-xl'>{sm.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
