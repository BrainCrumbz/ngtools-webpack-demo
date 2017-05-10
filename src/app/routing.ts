import { Routes, ExtraOptions } from '@angular/router';

import { HomeComponent } from '../home/view/home.component';
import { NotFoundComponent } from '../shared/view/not-found.component';

// NOTE: *do* keep this file at same level as module file,
// otherwise lazy-loaded modules cannot be found in AOT build

export const appRoutes: Routes = [{
  path: '',
  component: HomeComponent,

}, {
  path: 'private',
  loadChildren: '../private/module#PrivateModule',

}, {
  // keep less specific routes at the bottom
  path: '**',
  component: NotFoundComponent,

}];

export const appRoutingOpts: ExtraOptions = {
  useHash: false,
  enableTracing: false,
};
