import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an async Express handler and forwards any thrown error to next().
 * Eliminates try/catch boilerplate in every controller method.
 *
 * @param fn - Async Express request handler.
 * @returns A standard Express request handler with error forwarding.
 */
export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };
