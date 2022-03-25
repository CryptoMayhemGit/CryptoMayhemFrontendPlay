FROM node:16.14.0-alpine AS BUILD

WORKDIR /build
COPY ./app ./app
COPY ./home ./home

WORKDIR /build/home
RUN npm i
RUN npm run build

WORKDIR /build/app
RUN npm i
RUN npm run build


FROM nginx:1.20.2-alpine

COPY ./pipelines/manual/hook/config/home/cert/ /etc/nginx/certs/test.cryptomayhem.io/
COPY ./pipelines/manual/hook/config/app/cert/ /etc/nginx/certs/app.test.cryptomayhem.io/
COPY ./pipelines/manual/hook/config/rpc/cert/ /etc/nginx/certs/rpc.test.cryptomayhem.io/

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

COPY --from=BUILD /build/home/views/ /var/www/test.cryptomayhem.io/html
COPY --from=BUILD /build/home/img /var/www/test.cryptomayhem.io/html/img
COPY --from=BUILD /build/home/dist /var/www/test.cryptomayhem.io/html/dist

COPY --from=BUILD /build/app/dist/crypto-mayhem-frontend/ /var/www/app.test.cryptomayhem.io/html/

EXPOSE 80 443
