"use strict";

module.exports = {
  port: 3000,
  injectChanges: false,
  open: false,
  files: [
    '',
  ],
  watchOptions: {
    ignored: '**'
  },
  server: {
    baseDir: './buildOutput',
  }
}
