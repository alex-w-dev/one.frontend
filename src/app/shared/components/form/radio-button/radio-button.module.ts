import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioButtonComponent} from "./radio-button.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
      RadioButtonComponent,
    ],
    declarations: [
      RadioButtonComponent,
    ]
})
export class RadioButtonModule {
}
