import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  searchValue: string = '';

  constructor() { }

  ngOnInit() {
  }

  search() {
    alert(`Поиск по клиенту: "${this.searchValue}" ...`);
  }

}
