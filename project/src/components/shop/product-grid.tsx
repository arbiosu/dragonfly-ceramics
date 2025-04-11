'use client';

import type { Product } from '@/lib/stripe/utils';
import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import ProductCard from '@/components/shop/product-card';

interface ProductGridProps {
  products: Product[];
}

type Filter =
  | 'all'
  | 'mugs'
  | 'vases'
  | 'oil dispensers'
  | 'comfy cups'
  | 'soap dispensers'
  | 'coasters'
  | 'berry bowls'
  | 'merch';

const PRODUCTS_VISIBLE = 8;

export default function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [visibleCount, setVisibleCount] = useState<number>(PRODUCTS_VISIBLE);

  const filteredProducts = useMemo(() => {
    let filtered =
      filter === 'all'
        ? products
        : products.filter((item) => item.metadata.type === filter);

    if (sortOrder === 'asc') {
      filtered = [...filtered].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (sortOrder === 'desc') {
      filtered = [...filtered].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }
    return filtered;
  }, [products, filter, sortOrder]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount])

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (visibleCount < filteredProducts.length) {
      setVisibleCount((prev) => prev + PRODUCTS_VISIBLE);
    }
  }, [visibleCount, filteredProducts.length])

  useEffect(() => {
    if (observerRef.current === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    )
    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadMore])

  const filterButtons: Filter[] = [
    'all',
    'mugs',
    'vases',
    'oil dispensers',
    'comfy cups',
    'soap dispensers',
    'coasters',
    'berry bowls',
    'merch',
  ];

  return (
    <div>
      <div className='mb-6 flex flex-wrap justify-center gap-2'>
        {filterButtons.map((label, index) => (
          <button
            key={index}
            onClick={() => setFilter(label)}
            className={`px-4 py-2 font-medium text-df-text ${
              filter === label
                ? 'border-b-4 border-solid border-dfNew'
                : 'text-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className='mb-4 flex justify-center gap-4'>
        <label htmlFor='sortOrder' className='hidden text-lg text-df-text'>
          Sort Products:
        </label>
        <select
          id='sortOrder'
          onChange={(e) =>
            setSortOrder(e.target.value as 'asc' | 'desc' | 'none')
          }
          value={sortOrder}
          className='rounded bg-df-bg px-4 py-2 text-lg text-df-text'
        >
          <option value='none'>new releases</option>
          <option value='asc'>price: low to high</option>
          <option value='desc'>price: high to low</option>
        </select>
      </div>
      {visibleProducts.length > 0 ? (
        <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
          {visibleProducts.map((product, index) => (
            <div key={index} className='flex justify-center'>
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex h-40 items-center justify-center'>
          <p className='text-2xl font-semibold text-df-text'>sold out!</p>
        </div>
      )}
      <div ref={observerRef} className="h-10" />
    </div>
    
  );
}
