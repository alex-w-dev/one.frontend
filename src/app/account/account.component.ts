import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../../interfaces';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser(this);
  }

  isPatient() {
    return this.user && this.user.isPatient();
  }

  isDoctor() {
    console.log(this.user && this.user.isDoctor())
    return this.user && this.user.isDoctor();
  }

}
