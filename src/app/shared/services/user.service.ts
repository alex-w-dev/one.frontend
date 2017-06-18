import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface User {

}

@Injectable()
export class UserService {

  private user: User;

  constructor(private api: ApiService) {
    // setTimeout(() => {
    //   this.api.request('user').then((user: User) => {
    //     this.user = user;
    //   });
    // });
  }

  getUser(): User {
    return this.user;
  }

}
