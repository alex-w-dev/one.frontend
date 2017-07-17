import { Component, OnInit } from '@angular/core';
import { INotice, IUser } from '../../../interfaces';
import { ApiService } from '../../shared/services/api.service';
import { UserService } from '../../shared/services/user.service';
import { DialogService } from '../../shared/services/dialog/dialog.service';

@Component({
  selector: 'app-bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.scss']
})
export class BellComponent implements OnInit {
  user: IUser;

  notices: INotice[] = [];

  private noticeAskingInterval;

  private noticeCountValue: number = 0;

  get noticeCount() {
    return this.noticeCountValue;
  }

  set noticeCount(value) {
    this.noticeCountValue = value;
  }

  constructor(private apiService: ApiService, private dialogService: DialogService, private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser(this);

    setTimeout(() => {
      this.getNoticesAllFromServer();
    }, 1000);

    this.askNoticeCountFromServer();
    this.startNoticeAsk();
  }

  startNoticeAsk(): void {
    if (this.noticeAskingInterval) return;
    this.noticeAskingInterval = setInterval(() => {
      this.askNoticeCountFromServer();
    }, 10000);
  }

  askNoticeCountFromServer() {
    this.apiService.request('user/getusernotices', {'read': 0}).then((data) => {
      let noticeCount = data.result && (data.result.length || Object.keys(data.result).length) || 0;
      if (noticeCount !== this.noticeCount) {
        this.noticeCount = noticeCount;
        this.getNoticesAllFromServer();
      }
    }).catch(console.error);
  }

  getNoticesAllFromServer() {
    if (this.user) {
      this.apiService.request('user/getusernotices', {'read': 'all'}).then(data => {
        this.applyNotices(data.result);
      }).catch(console.error);
    }
  }

  applyNotices(serverNotics) {
    this.notices = [];
    Object.keys(serverNotics).forEach(noticeKey => {
      let serverNotice = serverNotics[noticeKey];
      this.notices.push({
        id: serverNotice.notice_id,
        type: serverNotice.notice_type,
        read: parseInt(serverNotice.read, 10),
        time: serverNotice.c_time,
        extra_data: serverNotice.extra_data,
      });
    });
  }

  setNoticeRead(notice: INotice) {
    if (notice.read) return;
    this.apiService.request('user/setnoticeread', {notice_id: notice.id}).then(console.log).catch(console.error);
    notice.read = 1;
  }

  deleteUserNotice(notice: INotice) {
    this.apiService.request('user/deleteusernotice', {notice_id: notice.id}).then((data) => {
      if (data.success) {
        this.notices.splice(this.notices.indexOf(notice), 1);
      }
    }).catch(console.error);
  }

  /* notices */
  approveConnection(notice: INotice) {
    if (this.user.isPatient()) {
      this.apiService.request('user/approveconnection', {doctor_id: notice.extra_data.doctor_id, pacient_id: this.user.id}).then((data) => {
        if (data.success) this.dialogService.alert('Вы успешно передали доступы доктору (ИД ' + data.result.doctor_id + ')');
      });
    }

    if (this.user.isDoctor()) {
      this.apiService.request('user/approveconnection', {pacient_id: notice.extra_data.pacient_id, doctor_id: this.user.id}).then((data) => {
        if (data.success) this.dialogService.alert('Вы успешно передали доступы пациенту (ИД ' + data.result.pacient_id + ')');
      });
    }

  }

  disconnectPacientFromDoctor(notice: INotice) {
    if (this.user.isPatient()) {
      this.apiService.request('user/disconnectpacientfromdoctor', {doctor_id: notice.extra_data.doctor_id, pacient_id: this.user.id}).then((data) => {
        if (data.success) this.dialogService.alert('Вы запретили показывать вашу четную запиь доктору (ИД ' + notice.extra_data.doctor_id + ')');
        this.dialogService.alert('Вы запретили показывать вашу четную запиь доктору (ИД ' + notice.extra_data.doctor_id + ')');
      });
    }

    if (this.user.isDoctor()) {
      this.apiService.request('user/disconnectpacientfromdoctor', {
        pacient_id: notice.extra_data.pacient_id,
        doctor_id: this.user.id
      }).then((data) => {
        if (data.success) this.dialogService.alert('Вы запретили показывать вашу четную запиь пациенту (ИД ' + notice.extra_data.pacient_id + ')');
      });
    }

  }

}
