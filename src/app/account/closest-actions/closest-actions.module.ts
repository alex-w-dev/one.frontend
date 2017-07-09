import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosestActionsComponent } from './closest-actions.component';
import { CalendarModule } from '../../shared/components/calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
  ],
  exports: [
    ClosestActionsComponent,
  ],
  declarations: [
    ClosestActionsComponent,
  ]
})
export class ClosestActionsModule { }
