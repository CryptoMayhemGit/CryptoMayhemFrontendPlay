FROM node:16.14.0-alpine

WORKDIR /contracts

COPY . .

RUN npm i

RUN npm run compile

CMD sleep 10 && \
    npm run deployLocal && \
    npm run exportLocal && \
    npm run verifyLocal
