'use client';

import { upsertProduct } from '@/lib/supabase/model';
import { Tables } from '@/lib/supabase/database';

export default function MakeAllProductsLiveButton({
  data,
}: {
  data: Tables<'products'>[];
}) {
  const handleMakeAllProductsLive = async () => {
    for (const product of data) {
      const update = {
        ...product,
        active: true,
      };
      await upsertProduct(update);
    }
  };

  return (
    <button
      onClick={() => handleMakeAllProductsLive()}
      className='rounded bg-red-600 p-4 font-bold'
    >
      Make all Drop Products Live
    </button>
  );
}
