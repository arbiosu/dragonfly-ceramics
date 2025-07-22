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

  // --- Page Number Generation Logic ---
  const getPageNumbers = () => {
    const pageNumbers = [];
    const displayPages = 5; // Number of page buttons to display
    const halfDisplay = Math.floor(displayPages / 2);

    if (totalPages <= displayPages) {
      // Show all pages if total is less than or equal to displayPages
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show ellipsis and selected pages
      let startPage = Math.max(0, optimisticPage - halfDisplay);
      let endPage = Math.min(totalPages - 1, optimisticPage + halfDisplay);

      if (optimisticPage - halfDisplay < 0) {
        endPage = Math.min(totalPages - 1, displayPages - 1);
      }

      if (optimisticPage + halfDisplay >= totalPages) {
        startPage = Math.max(0, totalPages - displayPages);
      }

      if (startPage > 0) {
        pageNumbers.push(0); // Always show first page
        if (startPage > 1) {
          pageNumbers.push(-1); // -1 will represent an ellipsis
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) {
          pageNumbers.push(-1); // Ellipsis
        }
        pageNumbers.push(totalPages - 1); // Always show last page
      }
    }
    return pageNumbers;
  };

  const pageNumbersToDisplay = getPageNumbers();

  return (
    <div data-pending={isPending ? '' : undefined} className='p-4 text-df-text'>
      <div className='flex items-center justify-center space-x-2 py-4 text-df-text'>
        <button
          disabled={!hasPrevPage || isPending}
          className='rounded-md bg-dfNew2 p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => updatePage(currentPage - 1)}
        >
          previous
        </button>
        {/* Page Numbers */}
        {pageNumbersToDisplay.map((page, index) =>
          page === -1 ? (
            <span key={`ellipsis-${index}`} className='px-2 py-2'>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => updatePage(page)} // page is 0-indexed
              disabled={isPending || optimisticPage === page}
              className={`rounded-md px-4 py-2 transition-opacity ${
                optimisticPage === page
                  ? 'cursor-default bg-blue-100 text-df-text'
                  : 'bg-dfNew2 hover:bg-dfNew2/80'
              } ${isPending ? 'disabled:cursor-not-allowed disabled:opacity-50' : ''} `}
            >
              {page + 1}
            </button>
          )
        )}

        <button
          disabled={!hasNextPage || isPending}
          className='rounded-md bg-dfNew2 p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => updatePage(currentPage + 1)}
        >
          next
        </button>
      </div>
      <p className='text-center'>
        Page {optimisticPage + 1} of {totalPages}
      </p>
    </div>
  );
}
