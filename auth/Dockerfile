# for devlopement 
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./ yarn.lock ./ tsconfig.json ./

RUN yarn install --ignore-scripts --frozen-lockfile

COPY src ./src

RUN yarn build 


FROM node:22-alpine AS prodbuilder


RUN addgroup -S appgrp && adduser -S app -G appgrp

USER app


WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production --ignore-scripts

COPY --from=builder /app/dist ./dist


# for production 
FROM gcr.io/distroless/nodejs22-debian12 AS production

WORKDIR /app

COPY --from=prodbuilder /app/node_modules  ./node_modules

COPY --from=prodbuilder /app/dist ./dist

EXPOSE 3001

CMD ["dist/src/index.js"]