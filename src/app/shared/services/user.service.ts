import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../classes/user';
import { IUser } from '../../../interfaces';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  userLoaded: EventEmitter<IUser> = new EventEmitter();
  private user: IUser;

  constructor(private api: ApiService, private router: Router) {
    setTimeout(() => {
      this.api.request('user').then((user: User) => {
        this.user = user;
        this.userLoaded.emit(user);
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

  getUser(): IUser {
    return this.user;
  }

  linkUser(userLink) {
    userLink = this.user;
  }

  register(formData) {
    return new Promise((resolve, reject) => {
      this.api.request('user/register', {}, formData, 'post')
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

}
