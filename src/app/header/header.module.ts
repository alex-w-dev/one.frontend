import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterializeModule } from 'angular2-materialize';
import { DirectivesModule } from '../shared/modules/directives.module';
import { BellModule } from './bell/bell.module';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    DirectivesModule,
    BellModule,
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
