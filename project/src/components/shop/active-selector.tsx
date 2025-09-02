'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const activeOptions = [
  { label: 'show all', value: 'all' },
  { label: 'available', value: 'true' },
  { label: 'sold out', value: 'false' },
];

export default function ActiveSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('active', value);
    params.set('page', '0');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const currentActiveFilter = searchParams.get('active') || 'all';

  return (
    <div data-pending={isPending ? '' : undefined} className='mb-4'>
      <label className='hidden'>sort by:</label>
      <select
        className='w-full rounded px-4 py-2 text-lg tracking-[-0.069em] text-gray-400'
        value={currentActiveFilter}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value=''>-- Select --</option>
        {activeOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
