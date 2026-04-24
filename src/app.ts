import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import apiRoutes from './routes/index';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { notFound } from './middlewares/notFound.middleware';
import { globalErrorHandler } from './middlewares/error.middleware';

/**
 * Build and return the Express application.
 * Separating app creation from server startup makes the app easily testable.
 *
 * @returns Configured Express Application instance.
 */
export function createApp(): Application {
  const app = express();

  // ─── Security headers ────────────────────────────────────────────────────────
  app.use(helmet());

  // ─── CORS ───────────────────────────────────────────────────────────────────
  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(',').map((o) => o.trim()),
      credentials: true,
    }),
  );

  // ─── Rate limiting ───────────────────────────────────────────────────────────
  app.use(
    '/api',
    rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      limit: env.RATE_LIMIT_MAX,
      standardHeaders: 'draft-7',
      message: { success: false, message: 'Too many requests, please try again later.' },
    }),
  );

  // ─── Request parsing ─────────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ─── HTTP logging ────────────────────────────────────────────────────────────
  app.use(requestLogger);

  // ─── Health check ─────────────────────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'OK', data: { uptime: process.uptime() } });
  });

  // ─── API routes ──────────────────────────────────────────────────────────────
  app.use('/api', apiRoutes);

  // ─── 404 fallback ────────────────────────────────────────────────────────────
  app.use(notFound);

  // ─── Global error handler ────────────────────────────────────────────────────
  app.use(globalErrorHandler);

  return app;
}
