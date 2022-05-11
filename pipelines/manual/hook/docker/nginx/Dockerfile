FROM node:16.14.0-alpine AS BUILD

WORKDIR /build
COPY ./app ./app
COPY ./home ./home

WORKDIR /build/home/en
RUN npm i
RUN npm run build

WORKDIR /build/app
RUN npm i
RUN npm run buildStage


FROM nginx:1.20.2-alpine

COPY ./pipelines/manual/hook/config/cert/ /etc/nginx/certs/test.cryptomayhem.io/

COPY ./pipelines/manual/hook/config/home/.htpasswd /var/www/test.cryptomayhem.io/
COPY ./pipelines/manual/hook/config/app/.htpasswd /var/www/app.test.cryptomayhem.io/
COPY ./pipelines/manual/hook/config/rpc/.htpasswd /var/www/rpc.test.cryptomayhem.io/

COPY ./pipelines/manual/hook/config/options-ssl-nginx.conf /etc/nginx/certs/
COPY ./pipelines/manual/hook/config/ssl-dhparams.pem /etc/nginx/certs/
COPY ./pipelines/manual/hook/config/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /var/log/nginx/test.cryptomayhem.io
RUN mkdir /var/log/nginx/app.test.cryptomayhem.io
RUN mkdir /var/log/nginx/rpc.test.cryptomayhem.io

RUN chmod 600 /etc/nginx/certs -R

COPY --from=BUILD /build/home/en/index.html /var/www/test.cryptomayhem.io/html/en/
COPY --from=BUILD /build/home/en/views /var/www/test.cryptomayhem.io/html/en/views
COPY --from=BUILD /build/home/en/img /var/www/test.cryptomayhem.io/html/en/img
COPY --from=BUILD /build/home/en/dist /var/www/test.cryptomayhem.io/html/en/dist

COPY --from=BUILD /build/home/pl/index.html /var/www/test.cryptomayhem.io/html/pl/

COPY --from=BUILD /build/app/dist/crypto-mayhem-frontend/ /var/www/app.test.cryptomayhem.io/html/

EXPOSE 443
