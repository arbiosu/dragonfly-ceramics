'use server';

import { createClient } from '../clients/server';
import { TablesInsert } from './types';

export async function createProduct(product: TablesInsert<'products'>) {
  const supabase = await createClient();
  return await supabase.from('products').insert({ ...product });
}

export async function upsertProduct(product: TablesInsert<'products'>) {
  const supabase = await createClient();
  return await supabase.from('products').upsert({ ...product });
}

export async function deleteProduct(id: number) {
  const supabase = await createClient();
  return await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select()
    .single();
}

interface GetProductsParameters {
  pageIndex: number;
  pageSize: number;
  active: boolean;
  previewsOnly: boolean;
  type: string | null;
  sortOrder: string;
}
export async function getProducts(params: GetProductsParameters) {
  const supabase = await createClient();
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (params.previewsOnly) {
    query.eq('is_preview', true);
  }

  if (params.active === true) {
    query.eq('active', true);
  } else {
    query = query.eq('active', false);
  }

  if (params.type) {
    query = query.eq('type', params.type);
  }

  switch (params.sortOrder) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'date_asc':
      query = query.order('created_at', { ascending: true });
      break;
    case 'date_desc':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  const from = params.pageIndex * params.pageSize;
  const to = from + params.pageSize - 1;

  query = query.range(from, to);

  return await query;
}
