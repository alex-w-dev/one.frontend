import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IUser, User } from '../classes/user';

@Injectable()
export class UserService {

  private user: IUser;

  constructor(private api: ApiService) {
    // setTimeout(() => {
    //   this.api.request('user').then((user: User) => {
    //     this.user = user;
    //   });
    // });
    this.user = new User({
      username: 'asda asd as',
      type: 'patient',
      email: 'asd@asd.ru',
    } as IUser);
  }

  getUser(): IUser {
    return this.user;
  }

}
