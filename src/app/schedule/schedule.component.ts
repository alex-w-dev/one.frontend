import { Component, Input, OnInit } from '@angular/core';
import { IScheduleForm, IScheduleTemplate} from '../../interfaces';
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
  scheduleList: IScheduleForm[] = [];
  templateList: IScheduleTemplate[] = [];
  startTimes: ISelectInputOption[] = [];
  endTimes: ISelectInputOption[] = [];
  clinics: ISelectInputOption[] = [];
  toEditSchedule: boolean = false;
  toAddSchedule: boolean = true;
  allowToEditAndAddSchedule: boolean = true;
  entries: IScheduleEntry[] = [];
  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
  titleMonth = '';
  currentMonth = (new Date()).getMonth();
  currentYear = (new Date()).getFullYear();
  currentDay = (new Date()).getDate();
  daysArray: any[] = [[], [], [], [], [], []];
  daysDoted: any[] = [];
  addTemplateOpen: boolean = false;
  templateListOpen: boolean = false;
  templateName: string | number = '';

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
    this.getTemplatesList();
    this.checkAllowToEditAndAddSchedule();
    this.drawCalendar(this.currentYear, this.currentMonth, this.currentDay);
  }

  checkAllowToEditAndAddSchedule() {
    let dateStr = this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + (this.currentDay + 1);
    let selectedDate = (new Date(dateStr).getTime());
    let currentDate = (new Date().getTime());
    if (currentDate > selectedDate) {
      this.allowToEditAndAddSchedule = false;
    } else {
      this.allowToEditAndAddSchedule = true;
    }
  }

  getClinicsList() {
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

  getTemplatesList() {
    this.templateList = [];
    this.apiService.request('user/get-doctors-schedule-templates').then(data => {
      console.log(data);
      if (data.success) {
        let date = this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay;
        Object.keys(data.result).forEach(templateKey => {
          this.templateList.push({
            template_id: data.result[templateKey]['template_id'],
            template_name: data.result[templateKey]['template_name'],
            link_date: data.result[templateKey]['link_date'],
            doctor_id: data.result[templateKey]['doctor_id'],
          });
        });
      }
    });
  }

  getMonthOfRightFormat(month) {
    let result = month + 1;
    if (result < 10) {
      result = '0' + result;
    }
    return result;
  }

  getDaySchedule() {
    this.clearFormAction();
    this.entries = [];
    this.scheduleList = [];
    this.apiService.request('user/get-day-schedule', {'reception_date': this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay}).then(data => {
      if( data.success) {
        Object.keys(data.result.info).forEach(scheduleKey => {
          let i = 0;
          this.scheduleList.push({
            clinic_id: data.result.info[scheduleKey]['clinic_id'],
            price: data.result.info[scheduleKey]['price'],
            start_time: data.result.info[scheduleKey]['start_time'],
            end_time: data.result.info[scheduleKey]['end_time'],
            reception_time: data.result.info[scheduleKey]['reception_time'],
            reception: data.result.info[scheduleKey]['reception'],
            reception_date: data.result.info[scheduleKey]['reception_date'],
            schedule_id: data.result.info[scheduleKey]['schedule_id'],
            clinic_name: data.result.info[scheduleKey]['clinic_name'],
            start_time_formated: data.result.info[scheduleKey]['start_time_formated'],
            end_time_formated: data.result.info[scheduleKey]['end_time_formated'],
          });
        });
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

  showEditForm(schedule_id) {
    this.toEditSchedule = true;
    this.toAddSchedule = false;
    Object.keys(this.scheduleList).forEach(scheduleKey => {
      if(this.scheduleList[scheduleKey]['schedule_id'] === schedule_id){
        this.newSchedule = {
          clinic_id: this.scheduleList[scheduleKey]['clinic_id'],
          price: this.scheduleList[scheduleKey]['price'],
          start_time: this.scheduleList[scheduleKey]['start_time'],
          end_time: this.scheduleList[scheduleKey]['end_time'],
          reception_time: this.scheduleList[scheduleKey]['reception_time'],
          reception: this.scheduleList[scheduleKey]['reception'],
          reception_date: this.scheduleList[scheduleKey]['reception_date'],
          schedule_id: schedule_id
        };
      }
    });
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
      schedule_id: this.newSchedule.schedule_id,
      reception: this.newSchedule.reception
    }).then(data => {
      if (data.success) {
        this.dialogService.alert('Вы успешно отредактировали график на ' + this.currentDay + ' ' + this.titleMonth);
        this.toEditSchedule = false;
        this.getDaySchedule();
      }
    });
  }

  addNewForm(){
    this.newSchedule = {clinic_id: 1, price: '', start_time: this.newSchedule.end_time, end_time: '0', reception_time: 30, reception: '', reception_date: ''};
    this.toEditSchedule = true;
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
        this.toEditSchedule = false;
        this.dialogService.alert('Вы успешно добавили график на ' + this.currentDay + ' ' + this.titleMonth);
        this.getDaySchedule();
      }});
  }

  deleteAction(schedue_id) {
    this.apiService.request('user/delete-schedule', {'schedule_id': schedue_id}).then(data => {
      console.log(data);
      if (data.success) {
        this.getDaySchedule();
        this.dialogService.alert('Вы успешно удалили график на ' + this.currentDay + ' ' + this.titleMonth);
      }
    });
  }

  clearFormAction() {
    this.newSchedule = {clinic_id: 1, price: '', start_time: '0', end_time: '0', reception_time: 30, reception: '', reception_date: ''};
  }

  viewTemplateList() {
    this.templateListOpen = true;
  }

  useTemplate(template_id) {
    this.apiService.request('user/get-schedule-template-data', {'template_id': template_id}).then(data => {
      if (data.success) {
        let reception_date = this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay;
        let addSuccess = 0;
        Object.keys(data.result.info).forEach(scheduleKey => {
          console.log(data.result.info);

          this.apiService.request('user/create-schedule', {
            reception_date: reception_date,
            clinic_id: data.result.info[scheduleKey]['clinic_id'],
            price: data.result.info[scheduleKey]['price'],
            start_time: data.result.info[scheduleKey]['start_time'],
            end_time: data.result.info[scheduleKey]['end_time'],
            reception_time: data.result.info[scheduleKey]['reception_time'],
            reception: data.result.info[scheduleKey]['reception']
          }).then(data2 => {
            if (data2.success) {
              addSuccess++;
            }
          });
        });
        this.toEditSchedule = false;
        this.templateListOpen = false;
        this.dialogService.alert('Вы успешно добавили график на ' + this.currentDay + ' ' + this.titleMonth);
        this.getDaySchedule();
      }
    });
  }

  deleteTemplate(template_id, template_name) {
    this.apiService.request('user/delete-template', {'template_id': template_id}).then(data => {
      console.log(data);
      if (data.success) {
        this.dialogService.alert('Вы успешно удалили шаблон "' + template_name + '"');
        this.getTemplatesList();
      }
    });
  }

  addTemplate() {
    this.addTemplateOpen = true;
  }

  saveTemplate() {
    this.apiService.request('user/make-schedule-template', {
      'template_name': this.templateName,
      'link_date': this.currentYear + '-' + this.getMonthOfRightFormat(this.currentMonth) + '-' + this.currentDay
    }).then(data => {
      console.log(data);
      if (data.success) {
        this.addTemplateOpen = false;
        this.templateName = '';
        this.dialogService.alert('Вы успешно добавили шаблон ' + this.templateName);
      }
    });
  }


  // work with calendar
  drawCalendar(y, m, day) {
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
          this.getDaysResult(y, m, d);
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

  getDaysResult(y, m, day) {
    this.apiService.request('user/get-day-schedule', {'reception_date': y + '-' + this.getMonthOfRightFormat(m) + '-' + day}).then(data => {
      if ( data.success) {
        this.daysDoted[this.daysDoted.length] = m + '.' + day;
      }
    });
  }

  getSchedule(day) {
    this.currentDay = day;
    this.getDaySchedule();
    this.toEditSchedule = false;
    this.toAddSchedule = true;
    this.templateListOpen = false;
    this.checkAllowToEditAndAddSchedule();
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
    this.toAddSchedule = true;
    this.toEditSchedule = false;
    this.templateListOpen = false;
    this.checkAllowToEditAndAddSchedule();
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
    this.toAddSchedule = true;
    this.toEditSchedule = false;
    this.templateListOpen = false;
    this.checkAllowToEditAndAddSchedule();
    this.drawCalendar(this.currentYear, this.currentMonth, 1);
  }
}
