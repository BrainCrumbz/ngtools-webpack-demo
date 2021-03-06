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

## Highlights

* AOT build does not need a distinct `main.browser.ts` entry point: both 
development and AOT builds use `platformBrowserDynamic().bootstrapModule()`

* Altough no actual *ngfactory* is created on disk, `tsconfig-aot,json` still 
has `angularCompilerOptions.genDir` option, and that is set to the same path 
where all sources are stored (`./src`)

* Both *tsconfig** files simply include all TypeScript files under sources 
directory (`src/**/*.ts`)

* Both *tsconfig** files explicitly set `baseUrl` option to the empty string
(`""`)

* `ngToolsWebpack.AotPlugin.entryModule` option is set as a relative path, 
without trailing `./`, without `.ts` extension, with module class name as a suffix

* `ContextReplacementPlugin` is currently disabled as a workaround to 
ngtools/webpack issues https://github.com/angular/angular-cli/issues/4431 and 
https://github.com/angular/angular-cli/issues/6518

## Integrating other libraries

See [chore/ngrx branch](https://github.com/BrainCrumbz/ngtools-webpack-demo/tree/chore/ngrx) for this same project integrating [ngrx platform](https://github.com/ngrx/platform).  
See [chore/ngx-boostrap branch](https://github.com/BrainCrumbz/ngtools-webpack-demo/tree/chore/ngx-boostrap) for this same project integrating [ngx-boostrap library](https://github.com/valor-software/ngx-bootstrap).
