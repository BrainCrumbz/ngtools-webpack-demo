import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from '../shared/view/angular2-color-picker';
import { NotFoundComponent } from '../shared/view/not-found.component';

@NgModule({
  imports: [
    // third-party modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // custom modules
    ColorPickerModule,
  ],
  declarations: [
    NotFoundComponent,
  ],
  exports: [
    NotFoundComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ],
})
export class SharedModule {
}
