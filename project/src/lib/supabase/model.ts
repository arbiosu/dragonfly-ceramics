'use server';

import { createServiceClient } from './service';
import { type ShippoAddress } from '../shippo/types';

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
