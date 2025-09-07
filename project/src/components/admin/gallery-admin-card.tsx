'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tables } from '@/lib/supabase/database';
import { deleteGalleryImageById } from '@/lib/supabase/model';

export default function AdminGalleryCard({
  image,
}: {
  image: Tables<'gallery_images'>;
}) {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteGalleryImageById(image.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className='relative w-full overflow-hidden'>
      <div className='relative aspect-square w-full overflow-hidden rounded-[2rem] border border-black p-4'>
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image.path}`}
          alt={image.type}
          fill
          sizes='100vw'
          unoptimized
        />
      </div>
      <div className='p-4'>
        <div className='flex items-start justify-between'>
          <div className='min-w-0 flex-1 -space-y-2'>
            <h3 className='truncate text-xl font-medium'>
              {image.type.toLowerCase()}
            </h3>
            <p className='-mt-2 truncate text-base font-extralight md:text-lg'>
              {image.color}
            </p>
            <p className='-mt-2 truncate text-base font-extralight md:text-lg'>
              {image.year}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className='w-full rounded bg-red-600 p-2 text-white hover:bg-red-700'
      >
        Delete Image
      </button>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-80 rounded bg-white p-6 shadow-lg'>
            <h4 className='mb-4 text-lg font-semibold text-gray-800'>
              Confirm Delete
            </h4>
            <p className='mb-6 text-sm text-gray-600'>
              Are you sure you want to delete {image.name} with id {image.id}?
              This action cannot be undone.
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
