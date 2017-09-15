import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  daysOfWeek = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
  format = 'dd/mm/yyyy';
  currentMonth = '';
  currentYear = '';
  f = 'M';
  daysArray: any[] = [[], [], [], [], [], []];

  constructor() { }

  ngOnInit() {
    this.drawCalendar(2017, 5);
  }

  drawCalendar(y, m) {
    // 1st day of the selected month
    let firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
    // Last date of the selected month
    let lastDateOfCurrentMonth = new Date(y, m + 1, 0).getDate();
    // Last day of the previous month
    let lastDateOfLastMonth = new Date(y, m, 0).getDate();
    if (m === 0) {
      lastDateOfLastMonth =  new Date(y - 1, 11, 0).getDate();
    }
    this.currentMonth = this.months[m];
    this.currentYear = y;
    let p, dm;
    if (this.f === 'M') {
      p = dm = 2;
    } else {
      if (firstDayOfCurrentMonth === 0) {
        p = dm = -5;
      } else {
        p = dm = 2;
      }
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
              day_num: cellvalue
            });
          k++;
          // Dates from next month
        } else if (d > lastDateOfCurrentMonth) {
          this.daysArray[j][k] = [];
          this.daysArray[j][k].push({
            type: 'next',
            day_num: p
          });
          k++;
          // Current month dates
        } else {
          this.daysArray[j][k] = [];
          this.daysArray[j][k].push({
            type: 'current',
            day_num: d
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
    console.log(this.daysArray);
  }

  getSchedule(day) {
    console.log(day);
  }


}
