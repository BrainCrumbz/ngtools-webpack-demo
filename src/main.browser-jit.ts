import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/module-dev';

if (NODE_ENV === 'production') {
  enableProdMode();
}

console.log('Client running, version \'%s\', environment: \'%s\', JIT build...', VERSION, NODE_ENV);

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule)
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
