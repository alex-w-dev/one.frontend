import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MaterializeModule } from 'angular2-materialize';
import { ModalWindowModule } from '../shared/components/modal/modal.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    ModalWindowModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
  ],
  declarations: [FooterComponent]
})
export class FooterModule { }
