# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencias del sistema y configuración TLS corporativa
RUN apk update && apk add --no-cache ca-certificates openssl && update-ca-certificates && apk add --no-cache libc6-compat
ENV npm_config_strict_ssl=false
ENV pnpm_config_strict_ssl=false
# Instalar pnpm global (evita resolución de Corepack)
RUN npm i -g pnpm@9.12.3

# Copiar package.json y pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Build de la aplicación Next.js
RUN pnpm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Configuración TLS y pnpm global en runtime
ENV npm_config_strict_ssl=false
ENV pnpm_config_strict_ssl=false
RUN npm i -g pnpm@9.12.3

# Copiar package.json y pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instalar solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile

# Copiar la build de la etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:${PORT:-3000}', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Comando de inicio
CMD ["sh", "-c", "pnpm start -- -p ${PORT:-3000} -H 0.0.0.0"]
