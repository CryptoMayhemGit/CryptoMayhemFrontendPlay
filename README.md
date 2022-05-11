# CryptoMayhemFrontend

## This project consists of:
`app` - Angular app
`home` - static landing page
`contracts` - blockchain backend
`pipelines` - auto/manual pipelines

## Environment variables:
1. Copy external config folders to project:
   - `pipelines/manual/hook/config`
   - `app/src/environments`

## Environments:
In both cases docker deploys blockchain, blockexplorer, contracts to network.
It also exports contracts info to `app/src/assets/contracts/contracts-metadata.json`.

------
### `local`:

- `localhost:8080/en` - `home en`
- `localhost:8080/pl` - `home pl`
- `localhost:4200`    - `app`
- `localhost:4000`    - `blockexplorer - scan`
- `localhost:8545`    - `blockchain - rpc`

#### To run:
   1. Go to `pipelines/manual/hook`
   2. Run `docker-compose -f docker-compose-local.yml up --build`
   3. Go to `app`
   4. Run `ng serve`
   5. Go to `home`
   6. Run local server (i.e. npm i -g live-server && live-server)
   7. Go to `en`
   8. Run `npm run buildWatch`

------
### `stage`:
Docker takes care of building `home` and `app`.
In order to login credentials are required. (*ask tester*)

- `test.cryptomayhem.io/en`                    - `home en`
- `test.cryptomayhem.io/pl`                    - `home pl`
- `app.test.cryptomayhem.io`                   - `app`
- `rpc.test.cryptomayhem.io`                   - `blockexplorer - scan`
- `rpc.test.cryptomayhem.io?token={non empty}` - `blockchain - rpc`

#### To run:
   1. Connect to server pointing to:
      - `test.cryptomayhem.io`
      - `app.test.cryptomayhem.io`
      - `rpc.test.cryptomayhem.io`
   2. Go to `pipelines/manual/hook`
   3. Run `docker-compose -f docker-compose-stage.yml up --build`
   4. (optional) To renew certs - every 3 months - run script `pipelines/manual/hook/scripts/certs.sh`
   5. (optional) Copy generated files from server to config folders:
   
```docker
COPY  /etc/letsencrypt/archive/test.cryptomayhem.io/  ./pipelines/manual/hook/config/cert/
```
------