import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextInputComponent} from "./text-input.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        TextInputComponent,
    ],
    declarations: [
        TextInputComponent,
    ]
})
export class TextInputModule {
}
