import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize';
import { DirectivesModule } from '../shared/modules/directives.module';
import { FormsModule } from '@angular/forms';
import { PageInDev2Component } from './page-in-dev2.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    DirectivesModule,
    FormsModule
  ],
  exports: [
    PageInDev2Component,
  ],
  declarations: [PageInDev2Component]
})
export class PageInDev2Module { }
