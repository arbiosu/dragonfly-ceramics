import { Button } from '@/components/shop/shop-button';
export default function Page() {
  return (
    <main className='py-20'>
      <section className='py-36'>
        <h1 className='text-center text-6xl tracking-[-0.04em] text-black'>
          {'coming soon! :)'}
        </h1>
        <div className='flex justify-center py-8'>
          <Button href={'/shop'} variant={'outline'} size={'large'}>
            <span className='relative z-10 text-2xl'>shop</span>
          </Button>
        </div>
      </section>
    </main>
  );
}
