import { NgModule } from '@angular/core';
import { ModalWindow }  from './modal.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [CommonModule],
    exports: [ModalWindow],
    declarations: [ModalWindow],
    providers: [],
})
export class ModalWindowModule { }
