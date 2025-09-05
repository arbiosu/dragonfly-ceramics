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
      <div className='container mx-auto mb-4 px-4'>
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-4'>
          <div className='col-span-2'>
            <Image
              src='/df-red-text.png'
              alt='Dragonfly Ceramics'
              height={200}
              width={400}
              unoptimized
              className='md:-mx-6'
            />
          </div>
          <div className='flex flex-col justify-end md:row-start-2'>
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
          <div className='col-span-2 row-start-2 md:col-start-4 md:row-start-1 md:pt-10'>
            <SubscribeCard text='' />
          </div>
          <div className='flex flex-col items-end justify-end md:col-start-4'>
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
