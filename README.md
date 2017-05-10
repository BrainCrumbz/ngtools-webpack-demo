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

## awesome-typescript-loader issue

When using *awesome-typescript-loader* to transpile TS, application shows
a blank page with a loading text message, and dev console shows runtime
errors at boot similar to:

> 2017-03-24 12:26:45.299 http://localhost:3000/not-found.component.html Failed to load resource: the server responded with a status of 404 (Not Found)

> 2017-03-24 12:26:45.301 main.browser-jit.ts:16Error while bootstrapping application:
(anonymous) @ main.browser-jit.ts:16

> 2017-03-24 12:26:45.302 main.browser-jit.ts:17Failed to load not-found.component.html
(anonymous) @ main.browser-jit.ts:17

> 2017-03-24 12:26:45.477 http://localhost:3000/templates/default/color-picker.component.html Failed to load resource: the server responded with a status of 404 (Not Found)

> 2017-03-24 12:26:45.493 http://localhost:3000/component.html Failed to load resource: the server responded with a status of 404 (Not Found)

When replacing `awesome-typescript-loader` with `ts-loader` in 
`webpack.common.js` and rebuilding, applications shows a login form instead,
and runtime errors in dev console are gone.
