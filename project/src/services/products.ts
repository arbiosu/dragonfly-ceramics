import { Result } from '@/lib/common/result';
import {
  ValidationError,
  TransactionError,
  RepositoryError,
} from '@/lib/common/errors';
import type { ProductQueryResult } from '@/repositories/product';
import type {
  Tables,
  TablesInsert,
  Enums,
  SortOrder,
} from '@/lib/supabase/database/types';

import { ProductRepository } from '@/repositories/product';

export interface CreateProductParams {
  product: TablesInsert<'products'>;
}

export interface UpdateProductParams {
  id: number;
  name?: string;
  type: Enums<'filter_type'>;
  description?: string;
  color?: string;
  care?: string;
  capacity?: string;
  active?: boolean;
  isPreview?: boolean;
  weight?: number;
  width?: number;
  length?: number;
  height?: number;
  set?: number;
  price?: number;
  discount?: number;
  inventory?: number;
}

interface FetchProductsParams {
  pageIndex: number;
  pageSize: number;
  active?: boolean;
  previewsOnly?: boolean;
  type?: Enums<'filter_type'>;
  sortOrder?: SortOrder;
  slug?: string;
}

export class ProductService {
  constructor(private repo: ProductRepository) {}

  async createProduct(
    params: CreateProductParams
  ): Promise<
    Result<
      Tables<'products'>,
      ValidationError | TransactionError | RepositoryError
    >
  > {
    // validate

    // create
    const createResult = await this.repo.create(params.product);

    return createResult;
  }

  async updateProduct(
    params: UpdateProductParams
  ): Promise<
    Result<
      Tables<'products'>,
      ValidationError | TransactionError | RepositoryError
    >
  > {
    // validate
    const existingResult = await this.repo.findById(params.id);
    if (!existingResult.success) {
      return existingResult;
    }

    const existing = existingResult.data;

    const updatedProduct: Tables<'products'> = {
      ...existing,
      ...params,
      // todo: updated_at
    };

    const updateResult = await this.repo.update(updatedProduct);

    return updateResult;
  }

  async deleteProduct(
    id: number
  ): Promise<Result<Tables<'products'>, RepositoryError>> {
    const result = await this.repo.delete(id);

    return result;
  }

  async getProductById(
    id: number
  ): Promise<Result<Tables<'products'>, RepositoryError>> {
    const result = await this.repo.findById(id);

    return result;
  }

  async getProductBySlug(
    slug: string
  ): Promise<Result<Tables<'products'>, RepositoryError>> {
    const result = await this.repo.findBySlug(slug);

    return result;
  }

  async fetchProducts(
    params: FetchProductsParams
  ): Promise<Result<ProductQueryResult, RepositoryError>> {
    const result = await this.repo.query({
      filter: {
        active: params.active,
        previews: params.previewsOnly,
        type: params.type,
        slug: params.slug,
      },
      range: {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
      },
      sort: {
        order: params.sortOrder,
      },
    });

    return result;
  }
}
