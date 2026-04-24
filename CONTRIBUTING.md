# Contributing

Thank you for considering contributing! Please follow these guidelines to keep the codebase consistent.

## Prerequisites

- Node.js ≥ 20
- npm ≥ 10

## Development Setup

```bash
git clone https://github.com/your-org/sequelize-ts-boilerplate.git
cd sequelize-ts-boilerplate
npm install
cp .env.example .env
# Edit .env with local DB credentials
npm run dev
```

## Branch Naming

| Type | Pattern |
|---|---|
| Feature | `feat/short-description` |
| Bug fix | `fix/short-description` |
| Refactor | `refactor/short-description` |
| Docs | `docs/short-description` |

## Code Standards

- **TypeScript strict mode** — no `any` without a `// TODO:` comment
- **No comments** explaining *what* the code does — use well-named identifiers
- **Comments only** for non-obvious *why* (hidden constraints, workarounds)
- **Architecture**: Router → Controller → Service → Model. No business logic in controllers
- **Async functions** must use `catchAsync` or explicit error handling

## Before Submitting a PR

```bash
npm run type-check   # must pass
npm run lint         # must pass
npm test             # must pass
```

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add pagination to products endpoint
fix: handle foreign key error on organization delete
docs: update API table in README
```

## Pull Request Checklist

- [ ] `type-check`, `lint`, and `test` all pass locally
- [ ] New code has corresponding tests (unit or integration)
- [ ] `.env.example` updated if new env variables were added
- [ ] Migration file added for any schema changes
- [ ] PR description explains *why*, not just *what* changed
