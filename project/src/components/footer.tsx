import Link from 'next/link';
import Image from 'next/image';
import SocialMediaLinksComponent from '@/components/socialmedia';
import SubscribeCard from '@/components/subscribe-card';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-dfNew2 py-8 -tracking-widest text-black'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Brand and Copyright */}
          <div className='md:col-span-2'>
            <Image
              src='/df-red-text.png'
              alt='Dragonfly Ceramics'
              height={200}
              width={400}
            />
            <div>
              <ul className='-space-y-2 text-xl'>
                <li>
                  <Link
                    href='/shop'
                    className='transition-colors hover:underline'
                  >
                    shop
                  </Link>
                </li>
                <li>
                  <Link
                    href='/shop'
                    className='transition-colors hover:underline'
                  >
                    seconds
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='transition-colors hover:underline'
                  >
                    about
                  </Link>
                </li>
                <li>
                  <Link
                    href='/gallery'
                    className='transition-colors hover:underline'
                  >
                    gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='transition-colors hover:underline'
                  >
                    contact
                  </Link>
                </li>
                <li>
                  <Link
                    href='/consulting'
                    className='transition-colors hover:underline'
                  >
                    consulting
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <SubscribeCard text='' />
            <div className='space-y-4'>
              <SocialMediaLinksComponent />
              <p className='text-sm'>
                &copy; {currentYear} dragonfly ceramics. all rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
