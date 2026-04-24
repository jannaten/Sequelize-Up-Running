import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types/models.types';

/**
 * Send a successful JSON response using the standard API envelope.
 *
 * @param res - Express Response object.
 * @param message - Human-readable success message.
 * @param data - Response payload.
 * @param statusCode - HTTP status code (default 200).
 * @param meta - Optional pagination metadata.
 */
export function sendSuccess<T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200,
  meta?: PaginationMeta,
): void {
  const body: ApiResponse<T> = { success: true, message, data };
  if (meta) body.meta = meta;
  res.status(statusCode).json(body);
}

/**
 * Send an error JSON response using the standard API envelope.
 *
 * @param res - Express Response object.
 * @param message - Human-readable error message.
 * @param statusCode - HTTP status code (default 500).
 * @param code - Machine-readable error code.
 */
export function sendError(res: Response, message: string, statusCode = 500, code = 'ERROR'): void {
  const body: ApiResponse<null> = { success: false, message, data: null };
  res.status(statusCode).json({ ...body, code });
}
