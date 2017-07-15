import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../classes/user';
import { IUser, IUserInfoFromServer } from '../../../interfaces';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  noticeCountChanged: EventEmitter<number> = new EventEmitter();

  userLoaded: EventEmitter<IUser> = new EventEmitter();

  private noticeAskingInterval;

  private noticeCount: number;

  private user: IUser;

  constructor(private api: ApiService, private router: Router) {
    setTimeout(() => {
      this.api.request('user/user').then((user: any) => {
        this.afterGetUserFromServer(user.result);
      }).catch((data) => {
        if (!this.api.isPublicPage()) {
          this.router.navigate(['login']);
        }
      });
    });
    // this.user = new User({
    //   username: 'asda asd as',
    //   type: 'doctor',
    //   email: 'asd@asd.ru',
    // } as IUser);
  }

  afterGetUserFromServer(userFromServer: IUserInfoFromServer) {
    this.api.setAccessToken(userFromServer.user_info.access_token);

    this.user = new User(userFromServer);

    this.userLoaded.emit(this.user);

    this.startNoticeAsk();
  }

  startNoticeAsk(): void {
    if (this.noticeAskingInterval) return;

    this.noticeAskingInterval = setInterval(() => {
      this.api.request('user/getusernotices').then((data) => {
        console.log(data);
        this.noticeCount = data.result;
      }).catch(console.error);
    }, 10000);
  }

  getNoticeCount(): number {
    return this.noticeCount;
  }

  getUser(component?: any): IUser {
    if (component) this.userLoaded.subscribe(user => component.user = user);
    return this.user;
  }

  linkUser(userLink) {
    userLink = this.user;
  }

  register(formData) {
    return new Promise((resolve, reject) => {
      this.api.request('user/register', formData)
        .then(data => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(console.error);
    });

  }

  login(formData) {
    return new Promise((resolve, reject) => {
      this.api.request('user/login', formData)
        .then(data => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(console.error);
    });

  }

  logout() {
    this.api.deleteAccessToken();
  }

}
