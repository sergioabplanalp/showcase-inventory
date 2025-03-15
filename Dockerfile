FROM node:18.20.7-alpine AS builder

WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .

RUN npx tsc

FROM node:18.20.7-alpine

WORKDIR /app
COPY --from=builder /build/dist /build/package*.json /build/.env.prod ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

EXPOSE 8080

ENTRYPOINT /wait && node app.js
