import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/classes/user';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { HelpersService } from '../shared/services/helpers.service';

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
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  searchValue: string = '';
  patientId: string = '';

  user: User;

  clients: IClientListClient[] = [];

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.userService.getUser(this);



    for (let i = 1; i < 11; i++) {
      this.clients.push({
        img: '../../public/img/client-list-avatear.png',
        name: `Пручковская Маргарита Сергеевна`,
        lastSurvey: `${i}.01.2017`,
        lastAppointment: `${i}.04.2017`,
        access: i % 2 ? !!(i % 3) : undefined,
      });
    }
  }

  addPatient() {
    if (this.patientId && this.user)
      this.apiService
        .request('user/createconnectionrequest', {
          doctor_id: this.user.id,
          pacient_id: this.patientId,
        })
        .then(data => {
          if (data.success) this.dialogService.alert('Все хорошо. Данные пользователя запрошены!');
          else this.dialogService.alert(HelpersService.deepFind(data, 'result.doctor_id.0') || 'Что-то пошло не так. ...');

        })
        .catch(console.error);
  }

  search() {
    alert(`Поиск по клиенту: "${this.searchValue}" ... (необходимо добавить на сервере)`);
  }
}
