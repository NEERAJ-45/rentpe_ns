FROM node:23-slim AS tester

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --ignore-scripts

COPY . .

RUN yarn test:ci

FROM node:23-slim AS builder

WORKDIR /app

COPY --from=tester /app ./

RUN yarn build

FROM nginx:1.27.5-alpine-slim AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]