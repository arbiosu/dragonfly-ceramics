import Image from 'next/image';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className='relative min-h-screen'>{children}</section>;
}
