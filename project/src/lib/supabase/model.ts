'use server';

import { createClient } from './clients/server';
import { type ShippoAddress } from '../shippo/types';
import { TablesInsert } from './database/types';
import { revalidatePath } from 'next/cache';

export async function uploadImage(file: File, productId: string) {
  const fileName = `product_images/${productId}/${Date.now()}`;
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
  return await supabase
    .from('orders')
    .select()
    .eq('checkout_session_id', checkoutSessionId);
}

export async function createProduct(product: TablesInsert<'products'>) {
  const supabase = await createClient();
  return await supabase.from('products').insert({ ...product });
}

export async function upsertProduct(product: TablesInsert<'products'>) {
  const supabase = await createClient();
  return await supabase.from('products').upsert({ ...product });
}

export async function retrieveProductByStripeId(productId: string) {
  const supabase = await createClient();
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
  active: boolean | null,
  type: string | null,
  sortOrder: string,
  preview: boolean | null
) {
  const supabase = await createClient();
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (preview) {
    query.eq('active', false).gt('inventory', 0);
  }

  if (active !== null) {
    if (active === true) {
      // Show only active products
      query = query.eq('active', true).gt('inventory', 0);
    } else {
      // Show only sold out products
      query = query.eq('active', false).eq('inventory', 0);
    }
  }
  if (active === null && !preview) {
    // Show all except drops (inactive with inventory > 0)
    query = query.or('active.eq.true,and(active.eq.false,inventory.eq.0)');
  }

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
      break;
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

export async function deleteProductById(id: string) {
  try {
    const supabase = await createClient();
    const { data: deleteData, error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('stripe_id', id)
      .select()
      .single();
    if (deleteError || !deleteData) {
      console.error(`Failed to delete article with stripe_id ${id}`);
      return {
        data: null,
        error: `Failed to delete product. Code: ${deleteError?.code || 'UNKNOWN'}`,
      };
    }
    // -- Success --
    revalidatePath('/shop');
    revalidatePath('/admin');
    return {
      data: deleteData,
      error: null,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        data: null,
        error: `Failed to delete product: ${error.message}`,
      };
    }
  }
}
