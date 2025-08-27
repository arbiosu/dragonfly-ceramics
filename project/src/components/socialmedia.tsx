import Image from 'next/image';
import Link from 'next/link';

interface SocialMediaData {
  src: string;
  link: string;
  alt: string;
}

interface SocialMediaLinkProps {
  items: SocialMediaData[];
}

export function SocialMediaLink({ src, link, alt }: SocialMediaData) {
  return (
    <Link
      href={link}
      rel='noopener noreferrer'
      className='block transition-transform hover:scale-110 focus:scale-110 active:scale-95'
      target='_blank'
    >
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        placeholder='blur'
        blurDataURL={src}
        unoptimized
      />
    </Link>
  );
}

export function SocialMediaLinks({ items }: SocialMediaLinkProps) {
  return (
    <div className='flex space-x-4'>
      {items.map((sm, index) => (
        <SocialMediaLink src={sm.src} link={sm.link} alt={sm.alt} key={index} />
      ))}
    </div>
  );
}

export default function SocialMediaLinksComponent() {
  const socials = [
    {
      src: '/youtube.svg',
      link: 'https://youtube.com/@dragonflyceramics?si=z3XyaYTzbkfRsiAe',
      alt: 'Youtube',
    },
    {
      src: '/tiktok.svg',
      link: 'https://www.tiktok.com/@dragonflyceramics?_t=ZT-8uFd3TGlJe7&_r=1',
      alt: 'Tiktok',
    },
    {
      src: '/instagram.svg',
      link: 'https://www.instagram.com/dragonflyceramics_?igsh=Y3ZxYTZqbzZjMWxx&utm_source=qr',
      alt: 'Instagram',
    },
  ];
  return <SocialMediaLinks items={socials} />;
}

export function SocialMediaCard() {
  return (
    <section className='w-full px-4 py-8'>
      <h6 className='mb-12 text-center text-6xl tracking-[-0.069em] lg:text-9xl'>
        socials
      </h6>
      <div className='mx-auto grid max-w-4xl grid-cols-3 gap-8'>
        {/* TikTok */}
        <div className='flex flex-col items-center'>
          <Link
            href='https://www.tiktok.com/@dragonflyceramics'
            rel='noopener noreferrer'
            className='mb-4 block transition-transform hover:scale-110 focus:scale-110 active:scale-95'
            target='_blank'
          >
            <Image
              src='/tiktok-df.png'
              alt='TikTok'
              width={120}
              height={120}
              className='h-24 w-24 rounded-full border border-black md:h-32 md:w-32'
              unoptimized
            />
          </Link>
          <p className='text-center text-lg md:text-xl'>tiktok</p>
        </div>

        {/* Instagram */}
        <div className='flex flex-col items-center'>
          <Link
            href='https://www.instagram.com/dragonflyceramics_/'
            rel='noopener noreferrer'
            className='mb-4 block transition-transform hover:scale-110 focus:scale-110 active:scale-95'
            target='_blank'
          >
            <Image
              src='/bowl-ig.png'
              alt='Instagram'
              width={120}
              height={120}
              className='h-24 w-24 rounded-full border border-black md:h-32 md:w-32'
              unoptimized
            />
          </Link>
          <p className='text-center text-lg md:text-xl'>instagram</p>
        </div>

        {/* YouTube */}
        <div className='flex flex-col items-center'>
          <Link
            href='https://www.youtube.com/@dragonflyceramics'
            rel='noopener noreferrer'
            className='mb-4 block transition-transform hover:scale-110 focus:scale-110 active:scale-95'
            target='_blank'
          >
            <Image
              src='/cup-yt.png'
              alt='YouTube'
              width={120}
              height={120}
              className='h-24 w-24 rounded-full border border-black md:h-32 md:w-32'
              unoptimized
            />
          </Link>
          <p className='text-center text-lg md:text-xl'>youtube</p>
        </div>
      </div>
    </section>
  );
}
