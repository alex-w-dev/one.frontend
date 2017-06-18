import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordInputType: 'text'|'password' = 'password'

  constructor() { }

  ngOnInit() {
  }

  togglePasswordInputType () {
    this.passwordInputType = (this.passwordInputType === 'text') ? 'password' : 'text';
  }

}
