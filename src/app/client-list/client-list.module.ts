import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list.component';
import { FormsModule } from '@angular/forms';
import { MaterializeDirective, MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
  ],
  exports: [
    ClientListComponent
  ],
  declarations: [
    ClientListComponent,
  ]
})
export class ClientListModule { }
