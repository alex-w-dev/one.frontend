import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ISelectInputOption } from '../shared/components/form/select-input/select-input.component';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/classes/user';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, AfterViewChecked {
  @Input() isEditMode: boolean = false;

  @Input() roleType: string = 'patient';

  birthDays: ISelectInputOption[];
  birthMonths: ISelectInputOption[];
  birthYears: ISelectInputOption[];
  districtNames: ISelectInputOption[];

  firstFormChecked: boolean = false;

  @Input() user: User;

  submitted = false;

  active = true;

  /* example : {name: 'Name is required'} */
  formErrors = {} as any;

  registrationForm: NgForm;
  @ViewChild('registrationForm') currentForm: NgForm;

  constructor(private userService: UserService, private apiService: ApiService, private router: Router) {
    this.birthDays = [];
    this.birthDays.push({
      value: '0',
      text: 'День',
    });
    for (let i = 1; i <= 31; i++) {
      this.birthDays.push({
        value: i.toString(),
        text: i.toString(),
      });
    }
    this.birthYears = [];
    this.birthDays.push({
      value: '0',
      text: 'Год',
    });
    for (let i = 1910; i <= 2017; i++) {
      this.birthYears.push({
        value: i.toString(),
        text: i.toString(),
      });
    }
    this.birthMonths = [
      {value: 'Январь', text: 'Январь'},
      {value: 'Февраль', text: 'Февраль'},
      {value: 'Март', text: 'Март'},
      {value: 'Апрель', text: 'Апрель'},
      {value: 'Май', text: 'Май'},
      {value: 'Июнь', text: 'Июнь'},
      {value: 'Июль', text: 'Июль'},
      {value: 'Август', text: 'Август'},
      {value: 'Сентябрь', text: 'Сентябрь'},
      {value: 'Октябрь', text: 'Октябрь'},
      {value: 'Ноябрь', text: 'Ноябрь'},
      {value: 'Декабрь', text: 'Декабрь'},
    ];
  }

  ngOnInit() {
    this.renewDistrictsList();
  }

  renewDistrictsList() {
    this.districtNames = [
      {value: '0', text: 'Регоин проживания'},
    ];
    /* TODO; too long initialisation - needs to FIX */
    let limit: number = 0;
    this.apiService.request('settings/districts').then(data => {
      if (data.success && data.result) {
        Object.keys(data.result).forEach(districtKey => {

          if (limit > 10) return;
          limit++;

          this.districtNames.push({
            value: data.result[districtKey]['dist_name'], // code
            text: data.result[districtKey]['dist_name'],
          });
        });
      }
    });
  }


  onSubmit() {
    if (this.isEditMode) {
      this.userService.edit(Object.assign({}, this.registrationForm.value))
        .then((data: any) => {
          console.log(data);
          this.userService.afterGetUserFromServer(data.result);
        })
        .catch((data) => {
          this.formErrors = data.result;
        });
      this.submitted = true;
    } else {
      this.userService.register(Object.assign({}, this.registrationForm.value, { type: this.user.type.replace('patient', 'pacient') }))
        .then((data: any) => {
          this.userService.afterGetUserFromServer(data.result);
          this.router.navigate(['/account']);
        })
        .catch((data) => {
          this.formErrors = data.result;
        });
      this.submitted = true;
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.firstFormChecked = true;

    if (this.currentForm === this.registrationForm) {
      return;
    }
    this.registrationForm = this.currentForm;
    this.registrationForm.valueChanges.subscribe(value => {
    });
  }

}
