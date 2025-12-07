'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Tables } from '@/lib/supabase/database';
import { uploadImage } from '@/lib/supabase/model';
import { updateProductImagesById } from '@/lib/stripe/utils';
import { deleteProductById } from '@/lib/supabase/model';

export default function AdminProductCard(props: {
  product: Tables<'products'>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteProductById(product.stripe_id);
    setShowDeleteConfirm(false);
  };

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
        <div>
          <Image
            src={product.images[0]}
            alt={product.description}
            height={80}
            width={80}
            unoptimized
          />
        </div>

        <p className='mb-4 flex-grow text-sm text-df-text'>
          Created at: {new Date(product.created_at).toLocaleDateString()}
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Is active: <strong>{product.active ? 'TRUE' : 'FALSE'}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Type: <strong>{product.type}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Inventory: <strong>{product.inventory}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Weight: <strong>{product.weight}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Length: <strong>{product.length}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Width: <strong>{product.width}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Height: <strong>{product.height}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Care: <strong>{product.care}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Color: <strong>{product.color}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Set: <strong>{product.set}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Capacity: <strong>{product.capacity}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Single: <strong>{product.single}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Price: <strong>{product.price / 100}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Discount: <strong>{product.discount}</strong>
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
      <form onSubmit={handleSubmit} className='py-2'>
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
      {/* Delete Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className='w-full rounded bg-red-600 p-2 text-white hover:bg-red-700'
      >
        Delete Product
      </button>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-80 rounded bg-white p-6 shadow-lg'>
            <h4 className='mb-4 text-lg font-semibold text-gray-800'>
              Confirm Delete
            </h4>
            <p className='mb-6 text-sm text-gray-600'>
              Are you sure you want to delete {product.name}? This action cannot
              be undone.
            </p>
            <div className='flex justify-end space-x-2'>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className='rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className='rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50'
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
