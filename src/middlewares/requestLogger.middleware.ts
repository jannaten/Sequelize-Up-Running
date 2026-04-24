import pinoHttp from 'pino-http';
import { logger } from '../utils/logger';

/**
 * HTTP request/response logger middleware using pino-http.
 * Logs method, url, status code, and response time for every request.
 */
export const requestLogger = pinoHttp({ logger });
