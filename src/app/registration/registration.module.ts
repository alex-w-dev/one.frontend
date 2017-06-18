import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {DirectivesModule} from "../shared/modules/directives.module";
import {FormsModule} from "@angular/forms";
import {TextInputModule} from "../shared/components/form/text-input/text-input.module";
import {SelectInputModule} from "../shared/components/form/select-input/select-input.module";

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
      TextInputModule,
      SelectInputModule,
  ],
  exports: [
    RegistrationComponent,
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
