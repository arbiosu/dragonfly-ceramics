import { ProductService } from '@/services/products';

import { ProductRepository } from '@/repositories/product';
import { SupabaseClient } from '@supabase/supabase-js';

export function createProductService(supabase: SupabaseClient) {
  const repo = new ProductRepository(supabase);
  return new ProductService(repo);
}
