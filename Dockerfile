# Etapa 1: Construcción del frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor opcional para desarrollo local
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build /app/build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000", "--no-clipboard"]
