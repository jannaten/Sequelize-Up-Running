import { Product } from '../models/Product.model';
import { AppError } from '../utils/AppError';
import type { ProductCreationInput, PaginationQuery, PaginationMeta } from '../types/models.types';

export interface PaginatedProducts {
  rows: Product[];
  meta: PaginationMeta;
}

/**
 * Retrieve a paginated list of all products.
 *
 * @param pagination - Page index and page size.
 * @returns Products array and pagination metadata.
 */
export async function getAllProducts(pagination: PaginationQuery): Promise<PaginatedProducts> {
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  const { count, rows } = await Product.findAndCountAll({ limit, offset, order: [['id', 'ASC']] });

  return {
    rows,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

/**
 * Retrieve a single product by primary key.
 *
 * @param id - Product primary key.
 * @returns The Product instance.
 * @throws AppError(404) when no product is found with that id.
 */
export async function getProductById(id: number): Promise<Product> {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new AppError(`Product with id ${id} not found`, 404, 'NOT_FOUND');
  }
  return product;
}

/**
 * Create a new product.
 *
 * @param input - Validated product creation fields.
 * @returns The newly created Product instance.
 */
export async function createProduct(input: ProductCreationInput): Promise<Product> {
  return Product.create(input);
}

/**
 * Update an existing product's fields.
 *
 * @param id - Product primary key.
 * @param input - Partial fields to update.
 * @returns The updated Product instance.
 * @throws AppError(404) when no product is found with that id.
 */
export async function updateProduct(
  id: number,
  input: Partial<ProductCreationInput>,
): Promise<Product> {
  const product = await getProductById(id);
  await product.update(input);
  return product;
}

/**
 * Delete a product by primary key.
 *
 * @param id - Product primary key.
 * @throws AppError(404) when no product is found with that id.
 */
export async function deleteProduct(id: number): Promise<void> {
  const product = await getProductById(id);
  await product.destroy();
}
