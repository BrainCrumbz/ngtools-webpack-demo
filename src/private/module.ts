import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrivateComponent } from '../private/view/component';
import { privateRoutes } from '../private/routing';

@NgModule({
  imports: [
    // custom routing
    RouterModule.forChild(privateRoutes),
  ],
  declarations: [
    PrivateComponent,
  ],
})
export class PrivateModule {
}
