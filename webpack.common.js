var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
  buildOutput: path.join(clientRoot, 'dist'),
  nodeModules: path.join(clientRoot, 'node_modules'),
  coverage: path.join(clientRoot, 'coverage'),

  staticFiles: path.join(clientSrc, 'static'),
};

var relPaths = {
  localDevRoot: 'dist/',

  // keep leading `./` in entry point relative paths
  mainEntryJit: './src/main.browser.ts',
  vendorEntryJit: './src/vendor-jit.ts',

  mainEntryAot: './src/main.browser.ts',
  vendorEntryAot: './src/vendor-aot.ts',

  // allow for multiple entry points, hence multiple outputs
  bundleJs: 'js/[name]-bundle.js',
  chunk: 'js/[id]-chunk.js',
  bundleCss: 'css/[name]-bundle.css',
};

var patterns = {
  // See https://github.com/angular/angular/issues/11580
  // https://github.com/angular/angular/issues/14898
  // https://github.com/angular/angular.io/issues/3514
  // The (\\|\/) piece accounts for path separators in *nix and Windows
  angularContext: /angular(\\|\/)core(\\|\/)@angular/,
  clientSrc: /src/,
  styles: /styles/,
  buildOutput: /dist/,
  nodeModules: /node_modules/,
};

var rules = {

  // pre-loaders
  // None

  // normal loaders

  typescript: {

    // all `.ts` files will be compiled through tsc by chosen tsLoaderJit.
    // `angular2-template-loader` converts template/style URLs into inlined template/styles.
    // `angular-router-loader` replaces string-based module lazy loading routes with actual
    // `loadChildren` router instructions
    jit: {
      test: /\.ts$/,
      use: [{
        loader: tsLoaderJit,
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
      }, {
        loader: 'angular2-template-loader',
      }, {
        loader: 'angular-router-loader',
      }],
      include: [
        patterns.clientSrc,
      ],
    },

    aot: {
      test: /\.ts$/,
      // use @ngtools loader
      use: [{
        loader: '@ngtools/webpack',
      }],
      include: [
        patterns.clientSrc,
      ],
    },

  },

  css: {

    // support for requiring component-scoped CSS as raw text
    // NOTE: this assumes that they're outside of global styles folder
    component: {
      test: /\.css$/,
      use: [
        'raw-loader',
        'postcss-loader',
      ],
      include: [
        patterns.clientSrc,
      ],
    },

    // support for requiring global, crosswide CSS styles as <style> tag
    // NOTE: this assumes that they're within global styles folder or in a library
    global: {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'to-string-loader',
          'css-loader',
          'postcss-loader',
        ],
      }),
      include: [
        patterns.styles, // include global styles
        patterns.nodeModules, // allow importing from third-party libraries
      ],
    },

  },

  sass: {

    // support for requiring component-scoped Sass as raw text
    // NOTE: this assumes that they're outside of global styles folder
    component: {
      test: /\.scss$/,
      use: [
        'raw-loader',
        'postcss-loader',
        'sass-loader',
      ],
      include: [
        patterns.clientSrc,
      ],
    },

    // support for requiring global, crosswide Sass styles as <style> tag
    // NOTE: this assumes that they're within global styles folder or in a library
    global: {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'to-string-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }),
      include: [
        patterns.styles, // include global styles
        patterns.nodeModules, // allow importing from third-party libraries
      ],
    },

  },

  // support for requiring HTML as raw text
  html: {
    test: /\.html$/,
    use: [
      'raw-loader',
    ],
    include: [
      patterns.clientSrc,
    ],
  },

  // post-loaders
  // None

};

var noParse = [
  /.+zone\.js\/dist\/.+/,
];

var resolve = {

  // resolve files using only those extensions
  extensions: ['.ts', '.js', '.json'],

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
  resolve: resolve,
  buildDefines: buildDefines,
};

module.exports = common;
