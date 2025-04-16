'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Tables } from '@/lib/supabase/database';
import { uploadImage } from '@/lib/supabase/model';
import { updateProductImagesById } from '@/lib/stripe/utils';

export default function AdminProductCard(props: {
  product: Tables<'products'>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      alert('Please upload an image');
      return;
    }

    if (file?.size / 1024 / 1024 >= 1) {
      alert('File size is too large. Image must be less than 1MB');
      return;
    }

    try {
      const imgPath = await uploadImage(file, product.stripe_id);
      if (!imgPath) {
        alert('File upload failed. Please try again later.');
        return;
      }
      const newImages = product.images;
      newImages.push(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/content/${imgPath}`
      );
      await updateProductImagesById(product.stripe_id, newImages);
    } catch (error) {
      alert('Upload failed. Please try again.');
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const { product } = props;

  return (
    <div className='relative w-full max-w-sm overflow-hidden bg-df-bg'>
      <div className='p-2'>
        <h3 className='text-lg font-semibold text-df-text'>{product.name}</h3>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Created at: {new Date(product.created_at).toLocaleDateString()}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Is active: {product.active ? 'TRUE' : 'FALSE'}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Type: {product.type}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Inventory: {product.inventory}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Weight: {product.weight}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Length: {product.length}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Width: {product.width}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Height: {product.height}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Care: {product.care}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Price: {product.price / 100}
        </p>
        <div className='mb-4'>
          <p className='mb-2 text-sm text-df-text'>Images: </p>
          <div className='h-32 overflow-y-auto rounded border border-gray-200 bg-white p-2'>
            {product.images.length > 0 ? (
              product.images.map((url, index) => (
                <div key={index} className='mb-1 truncate text-sm'>
                  <Link
                    href={url}
                    prefetch={false}
                    className='text-df-text hover:underline'
                  >
                    Image #{index + 1}: {url}
                  </Link>
                </div>
              ))
            ) : (
              <p className='text-sm italic text-gray-500'>
                No images available
              </p>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label className='mb-4 text-df-text'>
          {`Add an Image to ${product.name}`}
        </label>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          ref={fileInputRef}
          className='mb-4 text-df-text'
          required
        />
        <button
          type='submit'
          disabled={loading}
          className='w-full rounded bg-df-text p-2 text-white'
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
}
