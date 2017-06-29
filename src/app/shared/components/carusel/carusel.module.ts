import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaruselComponent } from './carusel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [CaruselComponent],
  declarations: [CaruselComponent]
})
export class CaruselModule { }
