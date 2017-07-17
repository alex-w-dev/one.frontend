import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/classes/user';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { HelpersService } from '../shared/services/helpers.service';
import { IUser } from '../../interfaces';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  searchValue: string = '';
  patientId: string = '';

  user: User;

  clients: IUser[] = [];

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.userService.getUser(this);

    this.getPatientList();
    this.userService.userLoaded.subscribe(() => {
      this.getPatientList();
    });
  }

  getPatientList() {
    if (! this.user) return;
    this.apiService.request('user/getdoctorspacients', { approved: 'all' }).then(data => {
      if (data.success && data.result) {
        Object.keys(data.result).forEach(serverUserId => {
          this.clients.push(new User(data.result[serverUserId]));
        });
      }
    });
  }

  addPatient() {
    if (this.patientId && this.user)
      this.apiService
        .request('user/createconnectionrequest', {
          doctor_id: this.user.id,
          pacient_id: this.patientId,
        })
        .then(data => {
          if (data.success) this.getPatientList();
          else this.dialogService.alert(HelpersService.deepFind(data, 'result.doctor_id.0') || 'Что-то пошло не так. ...');

        })
        .catch(console.error);
  }

  search() {
    this.dialogService.alert(`Поиск по клиенту: "${this.searchValue}" ... (необходимо добавить на сервере)`);
  }
}
