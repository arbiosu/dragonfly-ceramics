import Link from 'next/link';

export default async function AdminPortal() {
  return (
    <main className='min-h-screen p-20'>
      <section className='flex flex-col justify-center gap-8 text-black'>
        <h1 className='text-4xl'>Welcome back, Kelly.</h1>
        <Link
          href='/admin/products'
          className='max-w-sm rounded-xl bg-dfNew2 p-4 text-center transition duration-300 hover:scale-105'
        >
          Manage your products
        </Link>
        <Link
          href='/admin/email'
          className='max-w-sm rounded-xl bg-df-yellow p-4 text-center transition duration-300 hover:scale-105'
        >
          Manage your subscribers
        </Link>
      </section>
    </main>
  );
}
