FROM node:24-slim AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=builder app/dist/linkery-frontend/browser /usr/share/nginx/html