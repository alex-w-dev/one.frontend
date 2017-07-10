import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form.component';
import { DirectivesModule } from '../shared/modules/directives.module';
import { FormsModule } from '@angular/forms';
import { TextInputModule } from '../shared/components/form/text-input/text-input.module';
import { SelectInputModule } from '../shared/components/form/select-input/select-input.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    TextInputModule,
    SelectInputModule,
  ],
  exports: [
    RegistrationFormComponent
  ],
  declarations: [RegistrationFormComponent]
})
export class RegistrationFormModule { }
