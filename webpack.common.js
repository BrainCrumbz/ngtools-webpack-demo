var path = require('path');
var autoprefixer = require('autoprefixer');

// TODO delete watchpack explicit dependency from package.json when
// webpack fixes issue https://github.com/webpack/webpack/issues/4341

var tsLoaderJit = 'awesome-typescript-loader';
/*
var tsLoaderJit = 'ts-loader';
*/

var ports = {
  // local dev server port
  default: 51254,
  // local hot reload dev server port
  reload: 3000,
};

var urls = {
  public: '/',
};

var clientRoot = path.resolve(__dirname);

var clientSrc = path.join(clientRoot, 'src');

var absPaths = {
  clientSrc: clientSrc,
  buildOutput: path.join(clientRoot, 'buildOutput'),
  codegen: path.join(clientRoot, 'codegen'),
  nodeModules: path.join(clientRoot, 'node_modules'),
  coverage: path.join(clientRoot, 'coverage'),

  mainEntryJit: path.join(clientSrc, 'main.browser-jit.ts'),
  vendorEntryJit: path.join(clientSrc, 'vendor-jit.ts'),

  mainEntryAot: path.join(clientSrc, 'main.browser-aot.ts'),
  vendorEntryAot: path.join(clientSrc, 'vendor-aot.ts'),

  testEntry: path.join(clientSrc, 'karma-entry.js'),
  staticFiles: path.join(clientSrc, 'static'),
};

var relPaths = {
  localDevRoot: 'buildOutput/',

  main: 'js/main-bundle.js',
  vendor: 'js/vendor-bundle.js',

  // allow for multiple entry points, hence multiple outputs
  bundle: 'js/[name]-bundle.js',
  sourceMap: 'js/[name]-bundle.js.map',
  chunk: 'js/[id]-chunk.js',
};

var patterns = {
  testSources: path.join(absPaths.clientSrc, '**/*.spec.ts'),
  appSources: path.join(absPaths.clientSrc, '**/!(*.spec).ts'),
  // The (\\|\/) piece accounts for path separators in *nix and Windows
  //angularContext: /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
  // see https://github.com/angular/angular.io/issues/3514
  angularContext: /angular(\\|\/)core(\\|\/)@angular/,
};

var rules = {

  // pre-loaders

  // Source map loader support for *.js files
  // Extracts SourceMaps for source files that are added as sourceMappingURL comment.
  javascriptTest: {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [
      // these packages have problems with their sourcemaps
      path.join(absPaths.nodeModules, '@angular'),
      path.join(absPaths.nodeModules, 'rxjs'),
    ],
  },

  // normal loaders

  // all `.ts` files will be compiled through tsc by chosen tsLoaderJit.
  // `angular2-template-loader` converts template/style URLs into inlined template/styles.
  // `angular-router-loader` replaces string-based module lazy loading routes with actual
  // `loadChildren` router instructions
  typescriptJit: {
    test: /\.ts$/,
    use: [
      tsLoaderJit,
      'angular2-template-loader',
      'angular-router-loader',
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      /\.(spec|e2e|async)\.ts$/, // skip all test and async TS files
    ],
  },

  typescriptAot: {
    test: /\.ts$/,
    use: [{
      loader: tsLoaderJit,
      options: {
        configFileName: './tsconfig-aot.json',
      },
    }, {
      loader: 'angular2-template-loader',
    }, {
      loader: 'angular-router-loader',
      options: {
        aot: true,
        genDir: './codegen',
        debug: false,
      },
    }],
    include: [
      absPaths.clientSrc,
      absPaths.codegen, // include (AOT) generated code
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      /\.(spec|e2e|async)\.ts$/, // skip all test and async TS files
    ],
  },

  typescriptTest: {
    test: /\.ts$/,
    use: [
      tsLoaderJit,
      'angular2-template-loader',
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      /\.(e2e|async)\.ts$/, // skip end-to-end test and async TS files
    ],
  },

  // support for requiring component-scoped CSS as raw text
  // NOTE: this assumes that their filename ends in 'component.css'
  componentCss: {
    test: /component\.css$/,
    use: [
      'raw-loader',
      'postcss-loader',
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
    ],
  },

  // support for requiring component-scoped Sass as raw text
  // NOTE: this assumes that their filename ends in 'component.scss'
  componentSass: {
    test: /component\.scss$/,
    use: [
      'raw-loader',
      'postcss-loader',
      'sass-loader',
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
    ],
  },

  // support for requiring global, crosswide CSS as <style> tag
  // NOTE: this assumes that their filename doesn't contain `component`
  globalCss: {
    test: /^(?!.*component).*\.css$/,
    // TODO disable sourceMap until `TypeError: Path must be a string. Received undefined` error is fixed
    /*
    use: [
      {
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    */
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
    ],
    include: [
      absPaths.clientSrc,
      absPaths.nodeModules, // allow to import CSS from third-party libraries
    ],
    exclude: [
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
    ],
  },

  // support for requiring HTML as raw text
  html: {
    test: /\.html$/,
    loader: 'raw-loader',
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
    ],
  },

  // post-loaders

  // instrument only code that isn't test or third-party
  // delay coverage until after tests are run, fixing transpiled source coverage error
  istanbul: {
    enforce: 'post',
    test: /\.(js|ts)$/,
    loader: 'istanbul-instrumenter-loader',
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      /\.(e2e|spec)\.ts$/, // skip all test files
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
    ],
  },

};

var noParse = [
  /.+zone\.js\/dist\/.+/,
];

var postcss = [

  autoprefixer({
    browsers: ['last 2 versions'],
  }),

];

var resolve = {

  // resolve files using only those extensions
  extensions: ['.ts', '.js', '.json'],

  // resolve modules also looking in those paths
  modules: [
    absPaths.nodeModules,
  ],
};

function buildDefines() {
  var packageDef = require('./package.json');

  return {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'VERSION': JSON.stringify(packageDef.version),
  };
}

var common = {
  urls: urls,
  ports: ports,
  relPaths: relPaths,
  absPaths: absPaths,
  patterns: patterns,
  rules: rules,
  noParse: noParse,
  postcss: postcss,
  resolve: resolve,
  buildDefines: buildDefines,
};

module.exports = common;
