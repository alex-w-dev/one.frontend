import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { ModalWindowModule } from '../../shared/components/modal/modal.module';
import { RegistrationFormModule } from '../../registration-form/registration-form.module';

@NgModule({
  imports: [
    CommonModule,
    ModalWindowModule,
    RegistrationFormModule,
  ],
  exports: [
    ProfileInfoComponent,
  ],
  declarations: [
    ProfileInfoComponent,
  ]
})
export class ProfileInfoModule { }
