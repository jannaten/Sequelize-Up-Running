# sequelize-ts-boilerplate

[![CI](https://github.com/your-org/sequelize-ts-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/sequelize-ts-boilerplate/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node: >=22](https://img.shields.io/badge/Node-%3E%3D22-brightgreen.svg)](https://nodejs.org)

Production-grade REST API starter built with **Node.js 22**, **TypeScript 6**, **Sequelize v6**, and **Express 5**. Zero-compromise architecture — strict types, validated environment config, structured logging, rate limiting, global error handling, Docker, and CI out of the box.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22 LTS |
| Language | TypeScript 6 (strict) |
| Web framework | Express 5 |
| ORM | Sequelize 6 (PostgreSQL / SQLite) |
| Validation | Zod |
| Logging | Pino + pino-http |
| Security | Helmet, CORS, express-rate-limit |
| Testing | Jest + ts-jest + Supertest |
| Containerisation | Docker (multi-stage) + Docker Compose |
| CI | GitHub Actions |

---

## Prerequisites

- **Node.js** ≥ 22 ([nvm](https://github.com/nvm-sh/nvm) recommended)
- **PostgreSQL** 15+ (or use Docker Compose)
- **npm** ≥ 10

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/your-org/sequelize-ts-boilerplate.git
cd sequelize-ts-boilerplate

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Run migrations
npm run db:migrate

# 5. Seed the database
npm run db:seed

# 6. Start dev server
npm run dev
```

The API is now available at `http://localhost:3000`.

---

## Project Structure

```
.
├── .github/workflows/    # GitHub Actions CI pipeline
├── src/
│   ├── config/           # Env validation (Zod) and database connection
│   ├── controllers/      # Parse req/res, call service, send response
│   ├── middlewares/      # Global error handler, 404, request logger
│   ├── models/           # Sequelize model definitions and associations
│   ├── routes/           # Route registration and middleware attachment
│   ├── services/         # All business logic and database queries
│   ├── types/            # Shared TypeScript interfaces and Express augmentations
│   ├── utils/            # AppError, catchAsync, logger, response helpers
│   ├── validations/      # Zod request validation middleware factories
│   ├── app.ts            # Express application factory (testable)
│   └── server.ts         # Bootstrap: DB connect, sync, HTTP listen
├── migrations/           # Sequelize QueryInterface migration files
├── seeders/              # Realistic seed data
├── tests/
│   ├── integration/      # Supertest route tests against SQLite in-memory
│   └── unit/             # Jest unit tests with mocked models
├── Dockerfile            # Multi-stage build (deps → build → production)
├── docker-compose.yml    # App + PostgreSQL + pgAdmin
└── ...
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NODE_ENV` | No | `development` | `development`, `test`, or `production` |
| `PORT` | No | `3000` | HTTP port |
| `DB_HOST` | Yes | `localhost` | PostgreSQL host |
| `DB_PORT` | No | `5432` | PostgreSQL port |
| `DB_NAME` | Yes | — | Database name |
| `DB_USER` | Yes | — | Database user |
| `DB_PASSWORD` | Yes | — | Database password |
| `CORS_ORIGIN` | No | `http://localhost:3000` | Allowed origin(s), comma-separated or `*` |
| `RATE_LIMIT_WINDOW_MS` | No | `900000` | Rate-limit window in ms (15 min) |
| `RATE_LIMIT_MAX` | No | `100` | Max requests per window per IP |
| `LOG_LEVEL` | No | `debug` | `debug`, `info`, `warn`, or `error` |

The app **exits immediately** at startup if any required variable is missing or invalid, printing a precise error message.

---

## API Endpoints

All responses follow the standard envelope:

```json
{
  "success": true,
  "message": "Organizations retrieved",
  "data": [],
  "meta": { "page": 1, "limit": 20, "total": 3, "totalPages": 1 }
}
```

### Organizations

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/organizations` | List all (paginated: `?page=1&limit=20`) |
| `GET` | `/api/organizations/:id` | Get single organization |
| `POST` | `/api/organizations` | Create organization |
| `PATCH` | `/api/organizations/:id` | Update organization |
| `DELETE` | `/api/organizations/:id` | Delete organization |

### Products

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products` | List all products (paginated) |
| `GET` | `/api/products/:id` | Get single product |
| `POST` | `/api/products` | Create product |
| `PATCH` | `/api/products/:id` | Update product |
| `DELETE` | `/api/products/:id` | Delete product |

### Localizations

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/localizations` | List all localizations (paginated) |
| `GET` | `/api/localizations/:id` | Get localization with its values |
| `POST` | `/api/localizations` | Create localization |
| `POST` | `/api/localizations/values` | Add a localized value |
| `DELETE` | `/api/localizations/:id` | Delete localization |

### Health

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Server health check (uptime) |

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot-reload (`tsx watch`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Prettier format all source files |
| `npm test` | Run all Jest tests |
| `npm run db:migrate` | Run pending Sequelize migrations |
| `npm run db:migrate:undo` | Undo the last migration |
| `npm run db:seed` | Run all seeders |
| `npm run type-check` | TypeScript type-check without emitting |

---

## Docker

### Run with Docker Compose (recommended)

```bash
cp .env.example .env
# Fill in DB_NAME, DB_USER, DB_PASSWORD in .env

docker compose up --build
```

This starts:
- **app** on `http://localhost:3000`
- **postgres** on port `5432`
- **pgadmin** on `http://localhost:5050` (admin@admin.com / admin)

### Build the image manually

```bash
docker build -t sequelize-ts-boilerplate .
docker run -p 3000:3000 --env-file .env sequelize-ts-boilerplate
```

---

## Testing

Tests run against an **SQLite in-memory** database — no PostgreSQL required.

```bash
npm test            # run all tests
npm test -- --coverage  # with coverage report
```

The test suite includes:
- **Unit tests** (`tests/unit/`) — service functions tested with mocked models
- **Integration tests** (`tests/integration/`) — full HTTP request cycle via Supertest

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

---

## License

[MIT](LICENSE)
