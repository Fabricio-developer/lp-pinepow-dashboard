# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

# Injetado no bundle pelo Vite (vite.config define). Passe no build: --build-arg GEMINI_API_KEY=...
ARG GEMINI_API_KEY=""
ENV GEMINI_API_KEY=${GEMINI_API_KEY}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# loadEnv lê .env; sem arquivo, o define pode ficar vazio se não passar ARG
RUN printf 'GEMINI_API_KEY=%s\n' "$GEMINI_API_KEY" > .env

RUN npm run build

FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
