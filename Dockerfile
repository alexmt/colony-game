FROM node:9.4.0 as builder

WORKDIR /src

ADD package.json /src
ADD yarn.lock /src
RUN yarn install

ADD . .
RUN yarn build && yarn install --production

FROM node:9.4.0-alpine

COPY  --from=builder /src/dist /app
COPY  --from=builder /src/node_modules /app/node_modules
CMD node /app/api/main.js --publicDist /app/ui
