FROM node:20-alpine as builder

WORKDIR /usr/src

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

ENV NODE_ENV production
WORKDIR /usr/app

COPY --from=builder /usr/src/dist ./
COPY --from=builder /usr/src/node_modules ./node_modules

CMD ["node", "server.js"]
