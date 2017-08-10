import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { FormsModule } from '@angular/forms';
import { TextInputModule } from '../shared/components/form/text-input/text-input.module';
import { SelectInputModule } from '../shared/components/form/select-input/select-input.module';
import { RadioButtonModule } from '../shared/components/form/radio-button/radio-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextInputModule,
    SelectInputModule,
    RadioButtonModule
  ],
  exports: [
    QuestionnaireComponent
  ],
  declarations: [QuestionnaireComponent]
})
export class QuestionnaireModule { }
