import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-header-unlogined',
  templateUrl: 'header-unlogined.component.html',
  styleUrls: ['header-unlogined.component.scss']
})
export class HeaderUnloginedComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
