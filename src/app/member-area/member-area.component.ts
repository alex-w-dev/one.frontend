import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../../interfaces';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: [
    'member-area.component.scss'
  ]
})
export class MemberAreaComponent implements OnInit {

  user: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser(this);
  }
}
