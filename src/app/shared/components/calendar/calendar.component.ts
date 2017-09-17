import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
  titleMonth = '';
  currentMonth = (new Date()).getMonth();
  currentYear = (new Date()).getFullYear();
  daysArray: any[] = [[], [], [], [], [], []];

  constructor() { }

  ngOnInit() {
    this.drawCalendar(this.currentYear, this.currentMonth, (new Date()).getDate());
  }

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
    this.drawCalendar(this.currentYear, this.currentMonth, day);
  }

  getNextMonth() {
    if (this.currentMonth === 11) {
      this.currentYear = this.currentYear + 1;
      this.currentMonth = 0;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }
    this.drawCalendar(this.currentYear, this.currentMonth, 1);
  }

  getPrevMont() {
    if (this.currentMonth === 0) {
      this.currentYear = this.currentYear - 1;
      this.currentMonth = 11;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.drawCalendar(this.currentYear, this.currentMonth, 1);
  }
}
