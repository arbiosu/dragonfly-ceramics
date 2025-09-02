'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const sortOptions = [
  { label: 'newest releases', value: 'date_desc' },
  { label: 'price: low to high', value: 'price_asc' },
  { label: 'price: high to low', value: 'price_desc' },
  { label: 'oldest releases', value: 'date_asc' },
];

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    params.set('page', '0');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const currentSort = searchParams.get('sort') || 'date_desc';

  return (
    <div data-pending={isPending ? '' : undefined} className='mb-4'>
      <label className='hidden'>sort by:</label>
      <select
        className='w-full rounded px-4 py-2 text-lg tracking-[-0.069em] text-gray-400'
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value=''>-- Select --</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
