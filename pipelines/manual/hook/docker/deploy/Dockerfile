FROM node:16.14.0-alpine

WORKDIR /contracts

COPY . .

RUN npm i

CMD npm run deplyStage &&
    npm run verifyStage &&
    npm run exportStage
