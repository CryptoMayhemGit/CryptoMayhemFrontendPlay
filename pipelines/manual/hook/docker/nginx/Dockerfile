FROM node:16.14.0-alpine AS BUILD

WORKDIR /build
COPY ../../../app ./app
COPY ../../../home ./home

WORKDIR /build/home
RUN npm i
RUN npm run build

WORKDIR /build/app
RUN npm i
RUN npm run build


FROM nginx:1.20.2-alpine

RUN apk add certbot certbot-nginx
RUN certbot certonly \
        -d test.cryptomayhem.io \
        -d app.test.cryptomayhem.io \
        -d rpc.test.cryptomayhem.io \
        --nginx \
        --register-unsafely-without-email
COPY ./config/home/.htpasswd /var/www/test.cryptomayhem.io/
COPY ./config/app/.htpasswd /var/www/app.test.cryptomayhem.io/
COPY ./config/test.cryptomayhem.io.conf /etc/nginx/conf.d/default.conf

COPY --from=BUILD /build/home/img /var/www/test.cryptomayhem.io/html/img
COPY --from=BUILD /build/home/views /var/www/test.cryptomayhem.io/html/views
COPY --from=BUILD /build/home/dist /var/www/test.cryptomayhem.io/html/dist

COPY --from=BUILD /build/app/dist/crypto-mayhem-frontend/ /var/www/app.test.cryptomayhem.io/html/

EXPOSE 80 443