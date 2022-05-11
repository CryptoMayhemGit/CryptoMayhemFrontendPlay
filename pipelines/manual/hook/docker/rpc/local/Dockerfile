FROM node:16.14.0-alpine

WORKDIR /app

RUN npm i hardhat

COPY ./config/rpc/local/hardhat.config.js .

CMD npx hardhat node

EXPOSE 8545
