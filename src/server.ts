import { createApp } from './app';
import { connectDatabase } from './config/database';
import { sequelize } from './models/index';
import { env } from './config/env';
import { logger } from './utils/logger';

async function bootstrap(): Promise<void> {
  await connectDatabase();
  logger.info('Database connection established');

  // Sync all models in non-production environments (migrations own production schema)
  if (env.NODE_ENV !== 'production') {
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized');
  }

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });

  const shutdown = (signal: string): void => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(() => {
      void sequelize.close().then(() => {
        logger.info('Database connection closed');
        process.exit(0);
      });
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err: unknown) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
