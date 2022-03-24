FROM node:16.14.0-alpine

WORKDIR /app

COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm i 

CMD npm start

EXPOSE 9545
