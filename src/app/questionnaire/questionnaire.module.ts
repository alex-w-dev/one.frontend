import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule} from '@angular/platform-browser';
import { QuestionnaireComponent } from './questionnaire.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputModule } from '../shared/components/form/text-input/text-input.module';
import { SelectInputModule } from '../shared/components/form/select-input/select-input.module';
import { RadioButtonModule } from '../shared/components/form/radio-button/radio-button.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    TextInputModule,
    SelectInputModule,
    RadioButtonModule,
    RouterModule.forRoot([
      {
        path: 'questionnaire/:id_measure',
        component: QuestionnaireComponent
      }
    ]),
  ],
  exports: [
    QuestionnaireComponent
  ],
  declarations: [QuestionnaireComponent]
})
export class QuestionnaireModule { }
