import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorPickerService} from './color-picker.service';
import {
    ColorPickerDirective, DialogComponent, TextDirective, SliderDirective
} from './color-picker.directive';

@NgModule({
    imports: [CommonModule],
    providers: [ColorPickerService],
    declarations: [ColorPickerDirective, DialogComponent, TextDirective, SliderDirective],
    entryComponents: [DialogComponent],
    exports: [CommonModule, ColorPickerDirective]
})
export class ColorPickerModule {}
