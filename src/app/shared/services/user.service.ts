import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../classes/user';
import { IUser } from '../../../interfaces';

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
      type: 'doctor',
      email: 'asd@asd.ru',
    } as IUser);
  }

  getUser(): IUser {
    return this.user;
  }

}
