import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/classes/user';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { HelpersService } from '../shared/services/helpers.service';
import { IUser } from '../../interfaces';
import { MaterializeDirective } from 'angular2-materialize';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  searchValue: string = '';
  patientId: string = '';
  patientName: string = '';
  patientNamePrevious: string = '';

  user: User;

  clients: IUser[] = [];

  possiblePatientsMaterializeParams = [];
  possiblePatientsMaterializeParam;
  getPossiblePatientsTimeout;

  usersFromServer: { id: string, fio: string}[] = [];

  constructor(private apiService: ApiService,
              private userService: UserService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.userService.getUser(this);

    this.possiblePatientsMaterializeParam = {
      'data': {},
      onAutocomplete: (fio) => {
        let patient = this.usersFromServer.find(userFomServer => userFomServer.fio.trim().toLowerCase() === fio.trim().toLowerCase());
        if (patient) {
          this.patientId = patient.id;
        } else {
          this.patientId = '';
        }
      }
    };

    this.getPatientList();
    this.userService.userLoaded.subscribe(() => {
      this.getPatientList();
    });
  }

  getPossiblePatients(event) {
    if (this.patientNamePrevious === this.patientName) {
      return;
    } else {
      this.patientNamePrevious = this.patientName;
    }
    if (this.getPossiblePatientsTimeout) clearTimeout(this.getPossiblePatientsTimeout);
    this.getPossiblePatientsTimeout = setTimeout(() => {
      this.apiService.request('user/find-users-by-fio', {find: this.patientName}).then(data => {
        if (data.success && data.result) {
          this.usersFromServer = [];
          let materializeData = {};

          Object.keys(data.result).forEach(userId => {
            let userInfo = data.result[userId].user_info;
            if (userInfo) {
              let fio = `${userInfo.surname || ''} ${userInfo.name || ''} ${userInfo.patronymic || ''}`;

              materializeData[fio] = null;

              this.usersFromServer.push({
                fio: fio,
                id: userId,
              });
            }
          });

          this.possiblePatientsMaterializeParam.data = materializeData;
          this.possiblePatientsMaterializeParams = [this.possiblePatientsMaterializeParam];
          console.log(this.possiblePatientsMaterializeParams);
        }
      });
    }, 10);
  }

  changePossiblePatientHandler($event) {
    console.log($event);
  }

  getPatientList() {
    if (!this.user) return;
    this.apiService.request('user/getdoctorspacients', {approved: 'all'}).then(data => {
      if (data.success && data.result) {
        this.clients = [];
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
          if (data.success) {
            this.patientId = '';
            this.patientName = '';
            this.getPatientList();
          } else {
            this.dialogService.alert(HelpersService.deepFind(data, 'result.doctor_id.0') || 'Что-то пошло не так. ...');
          }

        })
        .catch(console.error);
  }

  search() {
    this.dialogService.alert(`Поиск по клиенту: "${this.searchValue}" ... (необходимо добавить на сервере)`);
  }
}
