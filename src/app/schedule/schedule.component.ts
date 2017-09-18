import { Component, Input, OnInit } from '@angular/core';
import { IScheduleForm } from '../../interfaces';
import { ISelectInputOption } from '../shared/components/form/select-input/select-input.component';
import { ApiService } from '../shared/services/api.service';
import { DialogService } from '../shared/services/dialog/dialog.service';

interface IScheduleEntry {
  name: string;
  time: string;
  place: string;
  price: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  newSchedule: IScheduleForm = {clinic_id: 1, price: '', start_time: '0', end_time: '0', reception_time: 30, reception: '', reception_date: ''};

  startTimes: ISelectInputOption[] = [];
  endTimes: ISelectInputOption[] = [];
  clinics: ISelectInputOption[] = [];
  toEditSchedule: boolean = false;
  entries: IScheduleEntry[] = [];
  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
  titleMonth = '';
  currentMonth = (new Date()).getMonth();
  currentYear = (new Date()).getFullYear();
  currentDay = (new Date()).getDate();
  daysArray: any[] = [[], [], [], [], [], []];
  daysDoted: any[] = [];

  @Input() editable: boolean = true;

  constructor(private apiService: ApiService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.getDaySchedule();

    let start_work = 7;
    let end_work = 21;
    this.startTimes.push({
      value: '0',
      text: 'C',
    });
    this.endTimes.push({
      value: '0',
      text: 'До',
    });

    for (let i = 0; i < end_work - start_work; i++) {
      let hour = start_work + i;
      this.startTimes.push({
        value: this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay + ' ' + hour + ':00:00',
        text: hour + ':00',
      });
      this.endTimes.push({
        value: this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay + ' ' + hour + ':00:00',
        text: hour + ':00',
      });
    }

    this.getClinicsList();
    this.drawCalendar(this.currentYear, this.currentMonth, this.currentDay);
  }

  getDaySchedule() {
    this.clearFormAction();
    this.entries = [];
    this.apiService.request('user/get-day-schedule', {'reception_date': this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay}).then(data => {
      if(data.success) {
        this.newSchedule = {
          clinic_id: data.result.info.clinic_id,
          price: data.result.info.price,
          start_time: data.result.info.start_time,
          end_time: data.result.info.end_time,
          reception_time: data.result.info.reception_time,
          reception: data.result.info.reception,
          reception_date: data.result.info.reception_date,
        };
        this.getClinicNameById(data.result.info.clinic_id);
        this.getTimeFromDate(data.result.info.start_time, data.result.info.end_time);

        Object.keys(data.result.schedule).forEach(visitKey => {
          this.entries.push({
            name: data.result.schedule[visitKey]['pacient_fio'],
            time: data.result.schedule[visitKey]['start_time'],
            place: data.result.schedule[visitKey]['clinic_name'],
            price: data.result.schedule[visitKey]['price'],
          });
        });
      }
    });
  }

  getClinicsList(){
    this.apiService.request('settings/get-clinics-list').then(data => {
      if (data.success) {
        Object.keys(data.result).forEach(clinicKey => {
          this.clinics.push({
            value: data.result[clinicKey].clinic_id,
            text: data.result[clinicKey].clinic_name
          });
        });
      }});
  }

  getClinicNameById(id) {
    if(this.clinics.length > 0){
      Object.keys(this.clinics).forEach(clinicKey => {
        if (this.clinics[clinicKey].value == id) {
          this.newSchedule.clinic_name = this.clinics[clinicKey].text;
        }
      });
    }
  }

  getTimeFromDate(start_date, end_date) {
    let hours =  new Date(Date.parse(start_date)).getHours();
    let minutes = new Date(Date.parse(start_date)).getMinutes();
    this.newSchedule.start_time_formated = hours + ':' + minutes + '0';

    let hours_end =  new Date(Date.parse(end_date)).getHours();
    let minutes_end = new Date(Date.parse(end_date)).getMinutes();
    this.newSchedule.end_time_formated = hours_end + ':' + minutes_end + '0';
  }

  getMonthOfRightFormat(month) {
    let result = month + 1;
    if(result < 10) {
      result = '0' + result;
    }
    return result;
  }

  showEditForm() {
    this.toEditSchedule = true;
  }

  editAction() {
    this.newSchedule.reception_date = this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay;
    this.apiService.request('user/edit-schedule', {
      reception_date: this.newSchedule.reception_date,
      clinic_id: this.newSchedule.clinic_id,
      price: this.newSchedule.price,
      start_time: this.newSchedule.start_time,
      end_time: this.newSchedule.end_time,
      reception_time: this.newSchedule.reception_time,
      reception: this.newSchedule.reception
    }).then(data => {
      if (data.success) {
        this.dialogService.alert('Вы успешно отредактировали график на ' + this.currentDay + ' ' + this.titleMonth);
        this.toEditSchedule = false;
        this.getDaySchedule();
      }
    });
  }

  deleteAction() {
    this.apiService.request('user/delete-schedule', {'reception_date': this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay}).then(data => {
      if (data.success) {
        this.clearFormAction();
        this.entries = [];
        this.dialogService.alert('Вы успешно удалили график на ' + this.currentDay + ' ' + this.titleMonth);
      }
    });
  }

  clearFormAction() {
    this.newSchedule = {clinic_id: 1, price: '', start_time: '0', end_time: '0', reception_time: 30, reception: '', reception_date: ''};
  }

  addAction() {
    this.newSchedule.reception_date = this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay;
    this.apiService.request('user/create-schedule', {
      reception_date: this.newSchedule.reception_date,
      clinic_id: this.newSchedule.clinic_id,
      price: this.newSchedule.price,
      start_time: this.newSchedule.start_time,
      end_time: this.newSchedule.end_time,
      reception_time: this.newSchedule.reception_time,
      reception: this.newSchedule.reception}).then(data => {
      if(data.success) {
        this.dialogService.alert('Вы успешно добавили график на ' + this.currentDay + ' ' + this.titleMonth);
        this.getDaySchedule();
      }});
  }

  getDaysResult(y, m, day) {
    this.apiService.request('user/get-day-schedule', {'reception_date': y + '-' + this.getMonthOfRightFormat(m) + '-' + day}).then(data => {
      if( data.success) {
        this.daysDoted[this.daysDoted.length] = day;
      }
    });
  }

  // work with calendar
  drawCalendar(y, m, day) {
    this.getDaysResult(y, m, day);
    this.daysArray = [[], [], [], [], [], []];
    // 1st day of the selected month
    let firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
    // Last date of the selected month
    let lastDateOfCurrentMonth = new Date(y, m + 1, 0).getDate();
    // Last day of the previous month
    let lastDateOfLastMonth = new Date(y, m, 0).getDate();
    if (m === 0) {
      lastDateOfLastMonth =  new Date(y - 1, 11, 0).getDate();
    }

    this.titleMonth = this.months[m];
    let p, dm;
    if (firstDayOfCurrentMonth === 0) {
      p = dm = -5;
    } else {
      p = dm = 2;
    }

    let cellvalue;
    for (let d, i = 0, j = 0, z0 = 0; z0 < 6; z0++) {
      for (let z0a = 0, k = 0; z0a < 7; z0a++) {
        d = i + dm - firstDayOfCurrentMonth;
        // Dates from prev month
        if (d < 1) {
          cellvalue = lastDateOfLastMonth - firstDayOfCurrentMonth + p++;
          this.daysArray[j][k] = [];
          this.daysArray[j][k].push({
            type: 'prev',
            day_num: cellvalue,
          });
          k++;
          // Dates from next month
        } else if (d > lastDateOfCurrentMonth) {
          this.daysArray[j][k] = [];
          this.daysArray[j][k].push({
            type: 'next',
            day_num: p++,
          });
          k++;
          // Current month dates
        } else {
          this.daysArray[j][k] = [];
          let active = 'false';
          if (d === day) {
            active = 'true';
          }
          this.daysArray[j][k].push({
            type: 'current',
            day_num: d,
            active: active,
          });
          k++;
          p = 1;
        }

        if (i % 7 === 6 && d >= lastDateOfCurrentMonth) {
          z0 = 10; // no more rows
        }
        i++;
      }
      j++;
    }
  }

  getSchedule(day) {
    this.currentDay = day;
    this.getDaySchedule();
    this.toEditSchedule = false;
    this.drawCalendar(this.currentYear, this.currentMonth, day);
  }

  getNextMonth() {
    if (this.currentMonth === 11) {
      this.currentYear = this.currentYear + 1;
      this.currentMonth = 0;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }
    this.currentDay = 1;
    this.getDaySchedule();
    this.toEditSchedule = false;
    this.drawCalendar(this.currentYear, this.currentMonth, 1);
  }

  getPrevMont() {
    if (this.currentMonth === 0) {
      this.currentYear = this.currentYear - 1;
      this.currentMonth = 11;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.currentDay = 1;
    this.getDaySchedule();
    this.toEditSchedule = false;
    this.drawCalendar(this.currentYear, this.currentMonth, 1);
  }
}
