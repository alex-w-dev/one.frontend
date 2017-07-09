import { Component, Input, OnInit } from '@angular/core';

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
  entries: IScheduleEntry[] = [];

  @Input() editable: boolean = true;


  constructor() { }

  ngOnInit() {
    for (let i = 1; i < 10; i++) {
      this.entries.push({
        name: 'Петренко Нина Владимировна',
        time: `1${i}:00`,
        place: `МСЧ №9`,
        price: `1 500 руб.`,
      });
    }
  }

  deleteAction() {
    alert('deleteAction');
  }

  addAction() {
    alert('addAction');
  }

}
