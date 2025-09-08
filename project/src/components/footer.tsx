import Link from 'next/link';
import Image from 'next/image';
import SocialMediaLinks from '@/components/socialmedia';
import SubscribeCard from '@/components/subscribe-card';

const footerLinks = [
  { href: '/', label: 'home' },
  { href: '/shop', label: 'shop' },
  { href: '/shop?page=0&filter=seconds', label: 'seconds' },
  { href: '/about', label: 'about' },
  { href: '/gallery', label: 'gallery' },
  { href: '/contact', label: 'contact' },
  { href: '/consulting', label: 'consulting' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-dfNew2 p-2 text-black'>
      <div className='mx-auto mb-4 w-full px-4'>
        <div className='grid grid-cols-2 grid-rows-2 lg:grid-cols-4'>
          <div className='col-span-2 flex justify-center lg:justify-start'>
            <Image
              src='/df-red-text.png'
              alt='Dragonfly Ceramics'
              height={200}
              width={400}
              unoptimized
              className='lg:-mx-6'
            />
          </div>
          <div className='flex flex-col justify-end lg:row-start-2'>
            <ul className='items-end -space-y-2 text-xl md:text-2xl'>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className='tracking-[-0.04em] transition-colors hover:underline'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-2 row-start-2 lg:col-start-4 lg:row-start-1 lg:pt-10'>
            <SubscribeCard
              headingText=''
              subText='sign up for mailing list'
              subTextAlignment='text-center'
              subTextSize='text-2xl'
            />
          </div>
          <div className='flex flex-col items-end justify-end lg:col-start-4'>
            <SocialMediaLinks />
            <p className='pt-6 text-xs md:text-sm'>
              &copy; {currentYear} dragonfly ceramics. all rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
