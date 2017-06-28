import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { ProfileInfoModule } from './profile-info/profile-info.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileInfoModule,
  ],
  declarations: [
    AccountComponent,
  ]
})
export class AccountModule { }
