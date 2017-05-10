# Info

## Build

Clean & bundle for JiT build:

```shell
> npm run build-dev
```

Clean & bundle for AoT build:

```shell
> npm run build-prod
```

Bundle only (without cleaning previous artifacts) for JiT build:

```shell
> npm run bundle-dev
```

Bundle only (without cleaning previous artifacts) for AoT build:

```shell
> npm run bundle-prod
```

## Run

Run dev server:

```shell
> npm run serve
```

then browse to `http://localhost:3000/`.

Dev server configuration at `./bs-config.js`.
Home page source at `./src/static/index.html`.
