'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

const filterOptions = [
  'mugs',
  'oil dispensers',
  'vases',
  'berry bowls',
  'comfy cups',
  'seconds',
];

export default function FilterPanel({ filters }: { filters: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticFilters, setOptimisticFilters] = useOptimistic(filters);
  const [isPending, startTransition] = useTransition();

  const updateFilters = (filters: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '0');
    newParams.set('filter', filters[0]);
    if (filters[0] == null) {
      newParams.delete('filter');
    }

    startTransition(() => {
      setOptimisticFilters(filters);
      router.push(`?${newParams}`);
    });
  };

  return (
    <div data-pending={isPending ? '' : undefined} className='text-df-text'>
      <div className='mb-6 flex flex-col -space-y-1 truncate'>
        {filterOptions.map((filter) => (
          <div key={filter} className='relative'>
            <input
              id={`filter-${filter}`}
              name={filter}
              type='checkbox'
              className='peer hidden'
              checked={optimisticFilters.includes(filter)}
              onChange={(e) => {
                const { name, checked } = e.target;
                const newFilters = checked ? [name] : [];
                updateFilters(newFilters);
              }}
            />
            <label
              htmlFor={`filter-${filter}`}
              className={`relative inline-block cursor-pointer ${optimisticFilters.includes(filter) ? 'border-b-2 border-df-text' : ''}`}
            >
              {filter}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
