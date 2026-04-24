import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

/** GET /api/products */
export const getAll = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const { rows, meta } = await productService.getAllProducts({ page, limit });
  sendSuccess(res, 'Products retrieved', rows, 200, meta);
});

/** GET /api/products/:id */
export const getOne = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const product = await productService.getProductById(Number(req.params.id));
  sendSuccess(res, 'Product retrieved', product);
});

/** POST /api/products */
export const create = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const product = await productService.createProduct(req.body as { name: string });
  sendSuccess(res, 'Product created', product, 201);
});

/** PATCH /api/products/:id */
export const update = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const product = await productService.updateProduct(
    Number(req.params.id),
    req.body as { name?: string },
  );
  sendSuccess(res, 'Product updated', product);
});

/** DELETE /api/products/:id */
export const remove = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await productService.deleteProduct(Number(req.params.id));
  sendSuccess(res, 'Product deleted', null, 204);
});
