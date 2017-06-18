import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectInputComponent} from "./select-input.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        SelectInputComponent,
    ],
    declarations: [
        SelectInputComponent,
    ]
})
export class SelectInputModule {
}
