FROM node:16.14.0-alpine

WORKDIR /contracts

COPY . .

RUN npm i

RUN npm run compile

CMD sleep 60 && \
    npm run deployStage && \
    npm run exportStage && \
    npm run verifyStage && \
    while true; do sleep infinity; done 
