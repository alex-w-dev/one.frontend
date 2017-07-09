import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../shared/modules/directives.module';
import { FormsModule } from '@angular/forms';
import { TextInputModule } from '../shared/components/form/text-input/text-input.module';
import { SelectInputModule } from '../shared/components/form/select-input/select-input.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    TextInputModule,
    SelectInputModule,
  ],
  exports: [
    LoginComponent,
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
