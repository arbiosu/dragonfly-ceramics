import type { Metadata } from 'next';
import { manrope } from '@/../public/fonts/fonts';
import Navbar from '@/components/nav';
import { NewFooter } from '@/components/footer';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dragonfly Ceramics',
  description: 'Handcrafted Pottery Shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${manrope.className} ${manrope.className} bg-white antialiased`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <NewFooter />
        </CartProvider>
      </body>
    </html>
  );
}
