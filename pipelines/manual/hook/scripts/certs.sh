certbot certonly \
        -d test.cryptomayhem.io \
        -d app.test.cryptomayhem.io \
        -d rpc.test.cryptomayhem.io \
        --nginx \
        --agree-tos \
        --register-unsafely-without-email
        