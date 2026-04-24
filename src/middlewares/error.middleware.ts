import { Request, Response, NextFunction } from 'express';
import {
  UniqueConstraintError,
  ValidationError as SequelizeValidationError,
  ForeignKeyConstraintError,
} from 'sequelize';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { env } from '../config/env';

interface ErrorBody {
  success: false;
  message: string;
  code: string;
  errors?: unknown;
  stack?: string;
}

/**
 * Global Express error-handling middleware.
 * Normalises AppError, Sequelize constraint errors, and unexpected errors into
 * a consistent JSON envelope. Stack traces are suppressed in production.
 */
export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // next MUST be declared even though it is unused — Express requires all four params
  // to recognise this as an error-handling middleware.
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = 'Internal server error';
  let code = 'INTERNAL_ERROR';
  let errors: unknown;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;

    if (code === 'VALIDATION_ERROR') {
      try {
        errors = JSON.parse(err.message) as unknown;
        message = 'Validation failed';
      } catch {
        // message stays as-is if it wasn't JSON
      }
    }
  } else if (err instanceof UniqueConstraintError) {
    statusCode = 409;
    message = 'A record with those values already exists';
    code = 'UNIQUE_CONSTRAINT_ERROR';
    errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
  } else if (err instanceof SequelizeValidationError) {
    statusCode = 422;
    message = 'Database validation failed';
    code = 'DB_VALIDATION_ERROR';
    errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
  } else if (err instanceof ForeignKeyConstraintError) {
    statusCode = 409;
    message = 'Related resource does not exist';
    code = 'FOREIGN_KEY_ERROR';
  } else {
    logger.error({ err }, 'Unhandled error');
  }

  const body: ErrorBody = { success: false, message, code };
  if (errors) body.errors = errors;
  if (env.NODE_ENV !== 'production') body.stack = err.stack;

  res.status(statusCode).json(body);
};
