'use client';

import { useState, useRef } from 'react';
import { Tables } from '@/lib/supabase/database/types';

export default function AdminProductCard(props: {
  product: Tables<'products'>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
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
          Price: <strong>{product.price / 100}</strong>
        </p>
        <p className='mb-4 flex-grow text-sm text-df-text'>
          Discount: <strong>{product.discount}</strong>
        </p>
        <div className='mb-4'>
          <p className='mb-2 text-sm text-df-text'>Images: </p>
          {/* 
          <div className='h-32 overflow-y-auto rounded border border-gray-200 bg-white p-2'>
            {product.images.length > 0 ? (
              product.images.map((url, index) => (
                <div key={index} className='mb-1 truncate text-sm'>
                  {index > 0 && (
                    <button
                      onClick={() => handleImageDelete(product, url)}
                      className='p-2 text-lg text-red-400'
                    >
                      X
                    </button>
                  )}
                  <Link
                    href={url}
                    prefetch={false}
                    className='text-df-text hover:underline'
                  >
                    {url}
                  </Link>
                </div>
              ))
            ) : (
              <p className='text-sm italic text-gray-500'>
                No images available
              </p>
            )}
          </div>
          */}
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className='w-full rounded bg-red-600 p-2 text-white hover:bg-red-700'
      >
        Delete Product
      </button>
    </div>
  );
}
