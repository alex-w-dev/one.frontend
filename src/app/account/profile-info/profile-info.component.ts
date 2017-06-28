import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  editProfileIsOpen: boolean = false;
  changePhotoIsOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
