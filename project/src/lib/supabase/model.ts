'use server';

import { createServiceClient } from './service';
import { type ShippoAddress } from '../shippo/types';
import { TablesInsert } from './database';

export async function uploadImage(file: File, productId: string) {
  const fileName = `product_images/${productId}/${Date.now()}`;
  const supabase = await createServiceClient();
  const { data, error } = await supabase.storage
    .from('content')
    .upload(fileName, file);

  if (error) {
    console.error(error.message);
  }

  return data?.path;
}

export async function saveOrder(
  checkoutSessionId: string,
  address: ShippoAddress
) {
  const supabase = await createServiceClient();
  return await supabase.from('orders').insert({
    checkout_session_id: checkoutSessionId,
    full_name: address.name,
    email: address.email,
    phone: address.phone,
    line1: address.street1,
    line2: address.street2,
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country,
  });
}

export async function retrieveOrder(checkoutSessionId: string) {
  const supabase = await createServiceClient();
  return await supabase
    .from('orders')
    .select()
    .eq('checkout_session_id', checkoutSessionId);
}

export async function createProduct(product: TablesInsert<'products'>) {
  const supabase = await createServiceClient();
  return await supabase.from('products').insert({ ...product });
}

export async function upsertProduct(product: TablesInsert<'products'>) {
  const supabase = await createServiceClient();
  return await supabase.from('products').upsert({ ...product });
}

export async function retrieveProductByStripeId(productId: string) {
  const supabase = await createServiceClient();
  return await supabase
    .from('products')
    .select()
    .eq('stripe_id', productId)
    .limit(1)
    .single();
}

export async function fetchProducts(
  pageIndex: number,
  pageSize: number,
  type: string | null,
  sortOrder: string
) {
  const supabase = await createServiceClient();
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (type) {
    query = query.eq('type', type);
  }

  switch (sortOrder) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'date_asc':
      query = query.order('created_at', { ascending: true });
    case 'date_desc':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;

  query = query.range(from, to);

  return await query;
}
