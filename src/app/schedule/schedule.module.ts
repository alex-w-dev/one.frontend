import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { CalendarModule } from '../shared/components/calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
  ],
  exports: [
    ScheduleComponent
  ],
  declarations: [ScheduleComponent]
})
export class ScheduleModule { }
