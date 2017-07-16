import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../../interfaces';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  user: IUser;

  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser(this);
  }

}
