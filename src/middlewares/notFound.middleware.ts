import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

/**
 * Catch-all middleware for routes that do not match any registered handler.
 * Creates a 404 AppError that the global error handler will format.
 */
export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404, 'NOT_FOUND'));
};
