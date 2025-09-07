import Link from 'next/link';
import UploadImageForm from './image-uploader';

export default async function GalleryUploader() {
  return (
    <main className='min-h-screen p-20'>
      <section className='flex flex-col justify-center gap-8'>
        <div>
          <h1 className='text-center text-2xl text-black'>
            Upload an Image to the Gallery
          </h1>
          <Link
            href='/admin'
            className='rounded bg-blue-200 p-4 text-black transition duration-300 hover:scale-105'
          >
            Back to Admin Portal
          </Link>
        </div>
        <div className='container mx-auto'>
          <UploadImageForm />
        </div>
      </section>
    </main>
  );
}
