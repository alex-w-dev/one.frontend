import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { DialogService } from '../shared/services/dialog/dialog.service';

@Component({
  selector: 'app-page-in-dev2',
  templateUrl: './page-in-dev2.component.html',
  styleUrls: ['./page-in-dev2.component.scss']
})
export class PageInDev2Component implements OnInit {

  fields: {name: string, value: string}[] = [];

  method: string = '';

  useAccessToken: boolean = true;

  token;

  constructor(private apiService: ApiService, private dialogService: DialogService) { }

  ngOnInit() {
    this.addField();

    this.token = this.getToken();
  }

  getToken() {
    return this.apiService.accessToken;
  }

  addField() {
    this.fields.push({
      name: '',
      value: ''
    });
  }

  testApi() {
    if (!this.method) {
      this.dialogService.alert('метод обязателен!');
      return;
    }

    let data = {};

    this.fields.forEach(field => {
      if (field.name) {
        data[field.name] = field.value;
      }
    });

    this.apiService.request(this.method, data, (this.getToken() && !this.useAccessToken));
  }

}
