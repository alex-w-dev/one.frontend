import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './left-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LeftNavComponent
  ],
  declarations: [LeftNavComponent]
})
export class LeftNavModule { }
