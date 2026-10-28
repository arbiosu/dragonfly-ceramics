import type { Metadata } from 'next';
import { manrope } from '@/../public/fonts/fonts';
import Banner from '@/components/top-banner';
import Navbar from '@/components/nav';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/contexts/CartContext';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang='en' className={cn("font-sans", geist.variable)}>
      <body
        className={`${manrope.className} ${manrope.className} bg-white antialiased`}
      >
        <CartProvider>
          <Banner />
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
