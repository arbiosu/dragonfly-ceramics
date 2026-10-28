'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/clients/server';
import { createProductService } from '@/lib/container';
import { serializeError } from '@/lib/common/action-utils';
import type {
  CreateProductParams,
  UpdateProductParams,
} from '@/services/products';
import type { ActionResult } from '@/lib/common/action-types';
import type { Tables } from '@/lib/supabase/database/types';

export async function createProductAction(
  data: CreateProductParams
): Promise<ActionResult<Tables<'products'>>> {
  const supabase = await createClient();
  const service = createProductService(supabase);
  const result = await service.createProduct(data);

  if (!result.success) {
    return {
      success: false,
      error: serializeError(result.error),
    };
  }

  revalidatePath('/', 'layout');

  return {
    success: true,
    data: result.data,
  };
}

export async function updateProductAction(
  data: UpdateProductParams
): Promise<ActionResult<Tables<'products'>>> {
  const supabase = await createClient();
  const service = createProductService(supabase);
  const result = await service.updateProduct(data);

  if (!result.success) {
    return {
      success: false,
      error: serializeError(result.error),
    };
  }

  revalidatePath('/', 'layout');

  return {
    success: true,
    data: result.data,
  };
}

export async function deleteProductAction(
  id: number
): Promise<ActionResult<Tables<'products'>>> {
  const supabase = await createClient();
  const service = createProductService(supabase);
  const result = await service.deleteProduct(id);

  if (!result.success) {
    return {
      success: false,
      error: serializeError(result.error),
    };
  }

  revalidatePath('/', 'layout');

  return {
    success: true,
    data: result.data,
  };
}
