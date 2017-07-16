import { Component, Input, OnInit } from '@angular/core';
import { ISelectInputOption } from '../shared/components/form/select-input/select-input.component';
import { User } from '../shared/classes/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() isEditMode: boolean = false;

  @Input() roleType: string = 'patient';
  roleTypes: ISelectInputOption[];

  @Input() user: User;

  constructor(private userService: UserService, private router: Router) {
    this.roleTypes = [];
    this.roleTypes.push({
      value: 'patient',
      text: 'Пациент',
    });
    this.roleTypes.push({
      value: 'doctor',
      text: 'Доктор',
    });
  }

  ngOnInit() {
    if (!this.user) this.user = new User();
  }

}
