# Stage 1: Build environment
FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

# Copy production dependencies and source
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3000/ || exit 1

# Runtime configuration
EXPOSE 3000
CMD ["npm", "start"]