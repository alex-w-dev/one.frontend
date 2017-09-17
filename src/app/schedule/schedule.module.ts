import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { BrowserModule} from '@angular/platform-browser';
import { CalendarModule } from '../shared/components/calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { TextInputModule } from '../shared/components/form/text-input/text-input.module';
import { SelectInputModule } from '../shared/components/form/select-input/select-input.module';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    BrowserModule,
    FormsModule,
    TextInputModule,
    SelectInputModule,
  ],
  exports: [
    ScheduleComponent
  ],
  declarations: [ScheduleComponent]
})
export class ScheduleModule { }
