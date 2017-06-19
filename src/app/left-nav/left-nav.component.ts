import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { IUserLeftMenuItem } from '../../interfaces';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  menuItems: IUserLeftMenuItem[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.menuItems = this.userService.getUser().entity.getLeftMenu();
  }

}
