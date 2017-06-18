import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {MaterializeModule} from "../materializecss/materizalizecss.module";

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
