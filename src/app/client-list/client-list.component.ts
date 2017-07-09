import { Component, OnInit } from '@angular/core';

interface IClientListClient {
  img: string;
  name: string;
  lastSurvey: string; // date
  lastAppointment: string; // date
  access?: boolean;
}

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  searchValue: string = '';

  clients: IClientListClient[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 1; i < 11; i++) {
      this.clients.push({
        img: '../../public/img/client-list-avatear.png',
        name: `Пручковская Маргарита Сергеевна`,
        lastSurvey: `${i}.01.2017`,
        lastAppointment: `${i}.04.2017`,
        access: (i % 2) ? (!!(i % 3)) : undefined,
      });

    }
  }

  search() {
    alert(`Поиск по клиенту: "${this.searchValue}" ...`);
  }

}
