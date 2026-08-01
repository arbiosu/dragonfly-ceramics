import Image from 'next/image';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='relative min-h-screen'>
      <Image
        src='/aug-bg.jpeg'
        alt=''
        fill
        priority
        sizes='100vw'
        className='-z-10 object-cover object-top'
      />
      {children}
    </section>
  );
}
