import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './left-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LeftNavComponent
  ],
  declarations: [LeftNavComponent]
})
export class LeftNavModule { }
