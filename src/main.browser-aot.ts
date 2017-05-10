import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from '../codegen/src/app/module-prod.ngfactory';

if (NODE_ENV === 'production') {
  enableProdMode();
}

console.log('Client running, version \'%s\', environment: \'%s\', AOT build...', VERSION, NODE_ENV);

export function main() {
  return platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
    .then(_ => console.log('Application successfully bootstrapped.'))
    .catch(err => {
      console.error('Error while bootstrapping application:');
      console.error(err);
    });
}

// support async tag or hmr
switch (document.readyState) {
  case 'interactive':
  case 'complete':
    main();
    break;

  case 'loading':
  default:
    document.addEventListener('DOMContentLoaded', () => main());
    break;
}
