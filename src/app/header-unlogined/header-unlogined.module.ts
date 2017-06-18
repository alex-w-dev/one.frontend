import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderUnloginedComponent} from './header-unlogined.component';
import {DirectivesModule} from "../shared/modules/directives.module";

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
  ],
  exports: [
    HeaderUnloginedComponent,
  ],
  declarations: [HeaderUnloginedComponent]
})
export class HeaderUnloginedModule { }
