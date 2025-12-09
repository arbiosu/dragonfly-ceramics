'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

// Map display labels to backend values
const filterConfig: Record<string, string> = {
  all: 'all',
  'mugs & cups': 'mugs',
  vases: 'vases',
  'oil & soap dispensers': 'dispensers',
  bowls: 'bowls',
  other: 'other',
  seconds: 'seconds',
};

// Get display labels for iteration
const filterLabels = Object.keys(filterConfig);

export default function FilterPanel({ filters }: { filters: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticFilters, setOptimisticFilters] = useOptimistic(filters);
  const [isPending, startTransition] = useTransition();

  const updateFilters = (backendValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '0');
    newParams.set('filter', backendValue);
    if (backendValue == null || backendValue === 'all') {
      newParams.delete('filter');
    }

    startTransition(() => {
      setOptimisticFilters([backendValue]);
      router.push(`?${newParams}`);
    });
  };

  return (
    <div data-pending={isPending ? '' : undefined} className='text-black'>
      <div className='mb-6 flex flex-col -space-y-1 text-base md:text-xl'>
        {filterLabels.map((label) => {
          const backendValue = filterConfig[label];
          return (
            <div key={backendValue} className='relative'>
              <input
                id={`filter-${backendValue}`}
                name={backendValue}
                type='checkbox'
                className='peer hidden'
                checked={optimisticFilters.includes(backendValue)}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    updateFilters(backendValue);
                  }
                }}
              />
              <label
                htmlFor={`filter-${backendValue}`}
                className={`relative inline-block cursor-pointer ${optimisticFilters.includes(backendValue) ? 'font-bold' : ''}`}
              >
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
