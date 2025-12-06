FROM node:24.10.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/
COPY .env.example ./

RUN npm ci

RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:24.10.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /usr/src/app/node_modules/.prisma /usr/src/app/node_modules/.prisma
COPY --from=build /usr/src/app/node_modules/@prisma /usr/src/app/node_modules/@prisma

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/doc ./doc

COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/prisma.config.ts ./

EXPOSE ${PORT}

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
