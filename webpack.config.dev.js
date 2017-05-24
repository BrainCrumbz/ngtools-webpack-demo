var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');

var common = require('./webpack.common.js');

// ensure development environment
process.env.NODE_ENV = 'development';

// detect development mode from environment
var devMode = process.env.DEV_MODE;

if (['build', 'reload'].indexOf(devMode) < 0) {
  devMode = 'build';
}

var config = {

  // Makes sure errors in console map to the correct file and line number
  // Makes sure that breakpoints are hit, and variable values are shown
  // 'cheap-module-eval-source-map' is quicker, but breakpoints don't work
  devtool: 'source-map',

  // Cache generated modules and chunks to improve performance in incremental builds
  cache: true,

  // Set base directory for resolving entry points
  context: common.absPaths.clientSrc,

  entry: {

    'vendor': common.absPaths.vendorEntryJit,

    // Client application main entry point
    'main': common.absPaths.mainEntryJit,

  },

  output: {

    // The output directory as absolute path (required), where build artifacts are saved
    path: common.absPaths.buildOutput,

    // A template for the name of each output file on disk, as a relative path
    filename: common.relPaths.bundleJs,

    // A template for the name of each source-map file, as a relative path
    sourceMapFilename: common.relPaths.sourceMap,

    // A template for the name of each intermediate chunk file, as a relative path
    chunkFilename: common.relPaths.chunk,

    publicPath: common.urls.public,

    // Include comments with information about the modules
    pathinfo: true,

  },

  module: {

    rules: [

      // Pre-loaders
      // none

      // Loaders
      common.rules.typescriptJit,
      common.rules.componentSass,
      common.rules.componentCss,
      common.rules.globalCss,
      common.rules.html,

      // Post-loaders
      // none

    ],

    // speed up build by excluding some big libraries from parsing
    noParse: common.noParse,

  },

  resolve: {

    extensions: common.resolve.extensions,
    modules: common.resolve.modules,

  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),

    // Until loaders are updated, use the LoaderOptionsPlugin to pass custom properties to third-party loaders
    new webpack.LoaderOptionsPlugin({

      // Put loaders into debug mode
      // Note: this will be deprecated in v3 or later. Remove when loaders will update.
      debug: true,

    }),

    // Provides context to Angular's use of System.import
    new webpack.ContextReplacementPlugin(
      common.patterns.angularContext,
      common.absPaths.clientSrc
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor'],
      filename: common.relPaths.bundleJs,
      minChunks: Infinity,
    }),

    new ExtractTextPlugin(common.relPaths.bundleCss),

    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Copy static assets from their folder to common output folder
    new CopyWebpackPlugin([{
      from: common.absPaths.staticFiles,
    }]),

  ],

};

// differences when reloading in development
if (devMode == 'reload') {

  var protocol = 'http';
  var hostname = 'localhost';

  var defaultServerUrl = url.format({
    protocol: protocol,
    hostname: hostname,
    port: common.ports.default,
  });

  var reloadServerUrl = url.format({
    protocol: protocol,
    hostname: hostname,
    port: common.ports.reload,
  });

  // webpack dev server configuration
  config.devServer = {

    port: common.ports.reload,

    // webpack dev server will serve bundles from memory at this relative URL path
    publicPath: common.urls.public,

    // webpack dev server will serve files from this directory
    contentBase: common.relPaths.localDevRoot,

    proxy: {
      // proxied to backend web server
      '/' : {
        target: defaultServerUrl,
        secure: false,
        prependPath: false,
      },
    },

    // For automatic page refresh, enable the 'webpack-dev-server/client?...' entry
    inline: true,

    // Enable Hot Module Replacement
    hot: true,

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    watchOptions: { aggregateTimeout: 300, poll: 1000 },

    // The rest is terminal configuration
    console: true,
    colors: true,
    progress: true,
    quiet: false,
    displayErrorDetails: true,
    displayCached: true,
    noInfo: true,
    stats: { colors: true },

  };

  config.plugins.push(

    // We have to manually add the Hot Replacement plugin when running from Node
    new webpack.HotModuleReplacementPlugin()

  );

};

module.exports = config;
