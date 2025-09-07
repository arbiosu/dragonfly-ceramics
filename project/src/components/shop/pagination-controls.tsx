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
    <div className='flex flex-wrap items-center justify-center gap-2 py-4 text-black'>
      <button
        disabled={!hasPrevPage || isPending}
        className='rounded-3xl border border-black px-2 text-sm transition-opacity hover:bg-dfNew2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-base'
        onClick={() => updatePage(currentPage - 1)}
      >
        <span className='sm:hidden'>‹</span>
        <span className='hidden sm:inline'>previous</span>
      </button>

      {pageNumbersToDisplay.map((page, index) =>
        page === -1 ? (
          <span key={`ellipsis-${index}`} className='px-2 py-1'>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => updatePage(page)}
            disabled={isPending || optimisticPage === page}
            className={`rounded-3xl border border-black px-2 text-sm transition-opacity sm:px-4 sm:text-base ${
              optimisticPage === page
                ? 'cursor-default bg-dfNew2 text-black'
                : 'hover:bg-dfNew2/80'
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {page + 1}
          </button>
        )
      )}

      <button
        disabled={!hasNextPage || isPending}
        className='rounded-3xl border border-black px-2 text-sm transition-opacity hover:bg-dfNew2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-base'
        onClick={() => updatePage(currentPage + 1)}
      >
        <span className='sm:hidden'>›</span>
        <span className='hidden sm:inline'>next</span>
      </button>
    </div>
  );
}
