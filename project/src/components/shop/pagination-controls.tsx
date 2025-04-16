'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticPage, setOptimisticPage] = useOptimistic(currentPage);
  const [isPending, startTransition] = useTransition();

  const updatePage = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', pageNumber.toString());

    startTransition(() => {
      setOptimisticPage(pageNumber);
      router.push(`?${newParams.toString()}`);
    });
  };

  return (
    <div
      data-pending={isPending ? '' : undefined}
      className='py-4 text-df-text'
    >
      <button
        disabled={!hasPrevPage || isPending}
        className='rounded-md bg-dfNew2 px-4 py-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-50'
        onClick={() => updatePage(currentPage - 1)}
      >
        previous
      </button>
      <span className='p-4'>
        Page {optimisticPage + 1} of {totalPages}
      </span>
      <button
        disabled={!hasNextPage || isPending}
        className='rounded-md bg-dfNew2 px-4 py-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-50'
        onClick={() => updatePage(currentPage + 1)}
      >
        next
      </button>
    </div>
  );
}
