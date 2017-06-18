import { Component, OnInit } from '@angular/core';
import {UserService, User} from "../shared/services/user.service";

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: [
    'member-area.component.scss'
  ]
})
export class MemberAreaComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }
}
