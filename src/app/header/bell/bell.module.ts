import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BellComponent } from './bell.component';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
  ],
  exports: [
    BellComponent
  ],
  declarations: [BellComponent]
})
export class BellModule { }
