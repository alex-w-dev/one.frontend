import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { ProfileInfoModule } from './profile-info/profile-info.module';
import { ClosestActionsModule } from './closest-actions/closest-actions.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileInfoModule,
    ClosestActionsModule,
    ServicesModule,
  ],
  declarations: [
    AccountComponent,
  ]
})
export class AccountModule { }
