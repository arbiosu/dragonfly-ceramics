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
    <div className='flex justify-start space-x-8'>
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
      link: 'https://www.instagram.com/dragonflyceramics.kelly?igsh=Y3ZxYTZqbzZjMWxx&utm_source=qr',
      alt: 'Instagram',
    },
  ];
  return <SocialMediaLinks items={socials} />;
}

export function SocialMediaLinksCard() {
  return (
    <div className='relative mx-auto flex h-full w-full flex-col overflow-hidden p-6'>
      <div className='flex justify-center'>
        <Image
          src='/profile.svg'
          alt='Profile icon with heart'
          width={100}
          height={100}
          placeholder='blur'
          blurDataURL='/profile.svg'
          unoptimized
        />
      </div>
      <div className='my-16 py-4 text-center'>
        <p className='text-lg text-df-text'>
          keep up with dragonfly ceramics on youTube, tiktok, and instagram
        </p>
      </div>
      <div className='flex justify-center'>
        <SocialMediaLinksComponent />
      </div>
    </div>
  );
}
