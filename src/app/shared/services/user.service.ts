import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../classes/user';
import { IUser, IUserInfoFromServer } from '../../../interfaces';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  userLoaded: EventEmitter<IUser> = new EventEmitter();

  private user: IUser;

  constructor(private api: ApiService, private router: Router) {
    setTimeout(() => {
      this.renewUserFromServer();
    });
  }

  renewUserFromServer() {
    this.api.request('user/user').then((user: any) => {
      this.afterGetUserFromServer(user.result);
    }).catch((data) => {
      if (!this.api.isPublicPage()) {
        this.router.navigate(['login']);
      }
    });
  }

  afterGetUserFromServer(userFromServer: IUserInfoFromServer) {
    this.api.setAccessToken(userFromServer.user_info.access_token);

    this.user = new User(userFromServer);

    this.userLoaded.emit(this.user);
  }

  getUser(component?: any): IUser {
    if (component) {
      component.user = this.user;
      this.userLoaded.subscribe(user => component.user = user);
    }
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

  edit(formData) {
    return new Promise((resolve, reject) => {
      this.api.request('user/edituser', formData)
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
    this.user = undefined;
    this.userLoaded.emit(this.user);
  }

}
