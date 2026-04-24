# ─── Stage 1: deps ────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
RUN apk upgrade --no-cache
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts

# ─── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS build
RUN apk upgrade --no-cache
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─── Stage 3: production ──────────────────────────────────────────────────────
FROM node:22-alpine AS production
RUN apk upgrade --no-cache
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copy compiled output only
COPY --from=build /app/dist ./dist

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

USER node
CMD ["node", "dist/server.js"]
