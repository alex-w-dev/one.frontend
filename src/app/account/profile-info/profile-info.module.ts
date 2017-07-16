import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { ModalWindowModule } from '../../shared/components/modal/modal.module';
import { RegistrationFormModule } from '../../registration-form/registration-form.module';
import { FileDropDirective, FileSelectDirective, FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    ModalWindowModule,
    RegistrationFormModule,
    FileUploadModule,
  ],
  exports: [
    ProfileInfoComponent,
  ],
  declarations: [
    ProfileInfoComponent,
  ]
})
export class ProfileInfoModule { }
