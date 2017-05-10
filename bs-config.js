"use strict";

module.exports = {
  port: 3000,
  injectChanges: false,
  open: false,
  files: [
    './src/**/*.{html,htm,css,js}'
  ],
  watchOptions: {
    ignored: 'node_modules'
  },
  server: {
    baseDir: './buildOutput',
  }
}
