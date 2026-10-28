import { BaseRepository } from '@/lib/common/base-repository';
import {
  DatabaseError,
  NotFoundError,
  RepositoryError,
} from '@/lib/common/errors';
import { Result, success, failure } from '@/lib/common/result';

import type {
  Tables,
  TablesInsert,
  Count,
  SortOrder,
  Enums,
} from '@/lib/supabase/database/types';

export interface QueryProductsOptions {
  count?: Count;
  onlyCount?: boolean;
  filter?: {
    id?: number;
    active?: boolean;
    previews?: boolean;
    slug?: string;
    type?: Enums<'filter_type'>;
  };
  select?: (keyof Tables<'products'>)[];
  sort?: {
    column?: keyof Tables<'products'>;
    order?: SortOrder;
  };
  range?: {
    pageIndex: number;
    pageSize: number;
  };
}

export interface ProductQueryResult {
  data: Tables<'products'>[];
  count: number | null;
}

export class ProductRepository extends BaseRepository {
  async create(
    data: TablesInsert<'products'>
  ): Promise<Result<Tables<'products'>, RepositoryError>> {
    const result = await this.supabase
      .from('products')
      .insert(data)
      .select()
      .single();
    return this.handleSingleResult(result, 'create', 'Product');
  }

  async query(
    options: QueryProductsOptions = { sort: { order: 'desc' } }
  ): Promise<Result<ProductQueryResult, RepositoryError>> {
    const selectColumns = options.select?.length
      ? options.select.join(', ')
      : '*';

    let query = this.supabase
      .from('creative_roles')
      .select(selectColumns as '*', {
        count: options.count,
        head: options.onlyCount ?? false,
      });

    if (options.filter?.id) {
      query = query.eq('id', options.filter.id);
    }

    if (options.filter?.active) {
      query = query.eq('active', options.filter.active);
    }

    if (options.filter?.previews) {
      query = query.eq('is_preview', options.filter.previews);
    }

    if (options.filter?.type) {
      query = query.eq('type', options.filter?.type);
    }

    if (options.filter?.slug) {
      query = query.eq('slug', options.filter.slug);
    }

    const sortColumn = options.sort?.column ?? 'created_at';
    const sortOrder = options.sort?.order ?? 'desc';

    query = query.order(sortColumn, { ascending: sortOrder === 'asc' });

    if (options.range) {
      const from = options.range.pageIndex * options.range.pageSize;
      const to = from + options.range.pageSize - 1;
      query = query.range(from, to);
    }

    const result = await query;
    return this.handleQueryResult(result, 'Product');
  }

  async findById(
    id: number
  ): Promise<Result<Tables<'products'>, DatabaseError | NotFoundError>> {
    const result = await this.query({
      filter: { id },
    });

    if (!result.success) {
      return result as Result<Tables<'products'>, DatabaseError>;
    }

    const product = result.data.data[0];
    if (!product) {
      return this.notFound('Product', id);
    }

    return success(product);
  }

  async findBySlug(
    slug: string
  ): Promise<Result<Tables<'products'>, DatabaseError | NotFoundError>> {
    const result = await this.query({
      filter: { slug },
    });

    if (!result.success) {
      return result as Result<Tables<'products'>, DatabaseError>;
    }

    const product = result.data.data[0];
    if (!product) {
      return this.notFound('Product', slug);
    }

    return success(product);
  }

  async update(
    data: Tables<'products'>
  ): Promise<Result<Tables<'products'>, RepositoryError>> {
    const idResult = this.requireId(data.id, 'Product');
    if (!idResult.success) {
      return idResult as Result<Tables<'products'>, DatabaseError>;
    }

    const result = await this.supabase
      .from('products')
      .update({ ...data })
      .eq('id', data.id)
      .select()
      .single();

    return this.handleSingleResult(result, 'update', 'Product');
  }

  async delete(
    id: number
  ): Promise<Result<Tables<'products'>, RepositoryError>> {
    const result = await this.supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select()
      .single();
    return this.handleSingleResult(result, 'delete', 'Product');
  }
}
