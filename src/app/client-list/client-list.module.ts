import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ClientListComponent
  ],
  declarations: [ClientListComponent]
})
export class ClientListModule { }
