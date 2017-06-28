import { NgModule } from '@angular/core';
import { ModalWindow }  from './modal.component';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from '../../../materializecss/materizalizecss.module';


@NgModule({
    imports: [CommonModule, MaterializeModule],
    exports: [ModalWindow],
    declarations: [ModalWindow],
    providers: [],
})
export class ModalWindowModule { }
