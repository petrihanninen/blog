# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN corepack enable
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile for reproducible builds
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=1
ENV NODE_ENV=production

# Build the Next.js application
RUN pnpm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
