import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserLogin } from '../../interfaces';
import { UserLogin } from '../shared/classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordInputType: 'text'|'password' = 'password';

  /* example : {username: 'Fio is required'} */
  formErrors = {} as any;

  firstFormChecked: boolean = false;

  submitted = false;

  loginForm: NgForm;
  @ViewChild('loginForm') currentForm: NgForm;

  user: IUserLogin = new UserLogin();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.logout();
  }

  togglePasswordInputType () {
    this.passwordInputType = (this.passwordInputType === 'text') ? 'password' : 'text';
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.firstFormChecked = true;

    if (this.currentForm === this.loginForm) {
      return;
    }
    this.loginForm = this.currentForm;
    this.loginForm.valueChanges.subscribe(value => {
    });
  }

  onSubmit() {
    this.userService.login(Object.assign({}, this.loginForm.value))
      .then((data: any) => {
        this.userService.afterGetUserFromServer(data.result);
        this.router.navigate(['/account']);
      })
    this.submitted = true;
  }

}
