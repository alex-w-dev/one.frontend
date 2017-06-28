import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { ModalWindowModule } from '../../shared/components/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ModalWindowModule,
  ],
  exports: [
    ProfileInfoComponent,
  ],
  declarations: [
    ProfileInfoComponent,
  ]
})
export class ProfileInfoModule { }
