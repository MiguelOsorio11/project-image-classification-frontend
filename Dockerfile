# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build de la aplicación Next.js
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Copiar package.json solamente
COPY package.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

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
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Comando de inicio
CMD ["npm", "start"]
