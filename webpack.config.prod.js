var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var common = require('./webpack.common.js');

// ensure production environment
process.env.NODE_ENV = 'production';

var config = {

  // Source maps are completely regenerated for each chunk at each build
  devtool: 'source-map',

  // Set base directory for resolving entry points
  context: common.absPaths.clientSrc,

  // Client application only, no dev server
  entry: {

    'vendor': common.absPaths.vendorEntryAot,

    'main': common.absPaths.mainEntryAot,

  },

  output: {

    path: common.absPaths.buildOutput,
    filename: common.relPaths.bundle,
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
      debug: false,

      // Put loaders into minimize mode.
      // Note: this will be deprecated in v3 or later. Remove when loaders will update.
      minimize: true,

      options: {

        postcss: common.postcss,

      },
    }),

    // Provides context to Angular's use of System.import
    // See https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      common.patterns.angularContext,
      common.absPaths.clientSrc
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor'],
      filename: common.relPaths.bundle,
      minChunks: mod => /node_modules/.test(mod.resource),
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
        drop_console: true,
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
