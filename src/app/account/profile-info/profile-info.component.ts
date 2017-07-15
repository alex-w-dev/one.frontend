import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/classes/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, AfterViewInit {
  editProfileIsOpen: boolean = false;
  changePhotoIsOpen: boolean = false;

  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (! this.user ) this.userService.getUser();
  }

  ngAfterViewInit(): void {
  }

}
