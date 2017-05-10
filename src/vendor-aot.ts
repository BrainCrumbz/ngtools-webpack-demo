import './vendor-common';

// Angular 2
// When doing AOT build, do *NOT* import any Angular 2 module here.
// Let compiler pick needed modules in main entry

if (NODE_ENV === 'development') {
  // activate long strack traces, only in development
  /*
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
  */
}
