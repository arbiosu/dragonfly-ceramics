'use server';

import { createServiceClient } from '@/lib/supabase/service';
import { revalidatePath } from 'next/cache';
import { upsertProduct } from './model';
import { TablesInsert } from './database';

interface GenerateSignedUrlResponse {
  data: {
    signedUrl: string;
    token: string;
    path: string;
  } | null;
  error: string | null;
}

export async function generateSignedUploadUrl(
  path: string
): Promise<GenerateSignedUrlResponse> {
  try {
    const supabase = await createServiceClient();

    const { data, error } = await supabase.storage
      .from('gallery')
      .createSignedUploadUrl(path);

    if (error || !data) {
      throw new Error('Failed to generateSignedUploadUrl');
    }
    return {
      data: data,
      error: null,
    };
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return {
        data: null,
        error: err.message,
      };
    }
    return {
      data: null,
      error: 'Unknown Error in generateSignedUploadUrl',
    };
  }
}

export async function deleteImageByUrl(
  product: TablesInsert<'products'>,
  url: string
) {
  try {
    const supabase = await createServiceClient();
    const parsedUrl = parseSupabaseUrl(url);

    if (parsedUrl === null) throw new Error('could not parse url');

    const { data, error } = await supabase.storage
      .from(parsedUrl.bucket)
      .remove([parsedUrl.filePath]);

    if (error) {
      throw new Error('Failed to remove image');
    }
    const newImgArray = fixProductImageArray(product.images ?? [], url);
    const updatedProduct = {
      ...product,
      images: newImgArray,
    };
    await upsertProduct(updatedProduct);
    revalidatePath('/', 'layout');
    return {
      data,
      error,
    };
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return {
        data: null,
        error: err.message,
      };
    }
    return { data: null, error: 'Unknown error in deleteImageByPath' };
  }
}

function parseSupabaseUrl(url: string) {
  const parts = url.split('/');
  const publicIndex = parts.indexOf('public');
  if (publicIndex === -1) return null;

  return {
    bucket: parts[publicIndex + 1],
    filePath: parts.slice(publicIndex + 2).join('/'),
  };
}

function fixProductImageArray(urls: string[], deletedUrl: string) {
  const filtered = urls.filter((url) => url !== deletedUrl);
  return filtered;
}
