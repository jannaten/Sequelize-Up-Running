// Force test environment so the database config uses SQLite in-memory
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'test';
process.env.DB_USER = 'test';
process.env.DB_PASSWORD = 'test';
process.env.LOG_LEVEL = 'error';
