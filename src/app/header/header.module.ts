import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterializeModule } from 'angular2-materialize';
import { DirectivesModule } from '../shared/modules/directives.module';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    DirectivesModule,
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
