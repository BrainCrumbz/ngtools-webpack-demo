var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngToolsWebpack = require('@ngtools/webpack');

var common = require('./webpack.common.js');

// ensure production environment
process.env.NODE_ENV = 'production';

var config = {

  // Source maps are completely regenerated for each chunk at each build
  devtool: 'source-map',

  // No need to set `context`, base directory for resolving entry points:
  // entry point paths are relative to current directory

  // Client application only, no dev server
  entry: {

    'vendor': common.relPaths.vendorEntryAot,

    'main': common.relPaths.mainEntryAot,

  },

  output: {

    path: common.absPaths.buildOutput,
    filename: common.relPaths.bundleJs,
    sourceMapFilename: common.relPaths.sourceMap,
    chunkFilename: common.relPaths.chunk,

    publicPath: common.urls.public,

  },

  module: {

    rules: [

      // Pre-loaders
      // none

      // Loaders
      common.rules.typescriptAot,
      common.rules.componentSass,
      common.rules.componentCss,
      common.rules.globalSass,
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

  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),

    // Until loaders are updated, use the LoaderOptionsPlugin to pass custom properties to third-party loaders
    new webpack.LoaderOptionsPlugin({

      // Put loaders into debug mode
      // Note: this will be deprecated in v3 or later. Remove when loaders will update.
      debug: false,

      // Put loaders into minimize mode.
      // Note: this will be deprecated in v3 or later. Remove when loaders will update.
      minimize: true,

    }),

    // Provides context to Angular's use of System.import
    new webpack.ContextReplacementPlugin(
      common.patterns.angularContext,
      common.absPaths.clientSrc,
      {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor'],
      filename: common.relPaths.bundleJs,
      minChunks: mod => /node_modules/.test(mod.resource),
    }),

    new ExtractTextPlugin(common.relPaths.bundleCss),

    // use @ngtools for AoT build
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: './tsconfig-aot.json',
      skipMetadataEmit: true,
      entryModule: 'src/app/module#AppModule',
    }),

    // Minimize scripts
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,

      // to debug production build, uncomment lines in [debug] section and comment lines in [prod] section

      // [prod]: Settings for production build
      beautify: false,
      mangle: {
        screw_ie8 : true,
        keep_fnames: true,
      },
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_debugger: true,
        drop_console: false, //true,
        dead_code: true,
        unused: true,
        conditionals: true,
        comparisons: true,
        sequences: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },

      // [debug]: Settings when debugging production build
      /*
      beautify: true,
      mangle: false,
      comments: true,
      compress: {
        warnings: true,
        screw_ie8: false,
        drop_debugger: false,
        drop_console: false,
        dead_code: false,
        unused: false,
        conditionals: false,
        comparisons: false,
        sequences: false,
        evaluate: false,
        if_return: false,
        join_vars: false,
      },
      */
    }),

    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Copy static assets from their folder to common output folder
    new CopyWebpackPlugin([{
      from: common.absPaths.staticFiles,
    }]),

  ],

};

module.exports = config;
