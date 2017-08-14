import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  private autoSave;

  constructor(private userService: UserService, private apiService: ApiService, private router: Router) {
    this.birthDays = [];
    for (let i = 1; i <= 31; i++) {
      this.birthDays.push({
        value: (i < 10 ) ? '0' + i.toString() : i.toString(),
        text: i.toString(),
      });
    }
    this.birthYears = [];
    for (let i = 2017; i >= 1910; i--) {
      this.birthYears.push({
        value: i.toString(),
        text: i.toString(),
      });
    }
    this.birthMonths = [
      {value: '01', text: 'Январь'},
      {value: '02', text: 'Февраль'},
      {value: '03', text: 'Март'},
      {value: '04', text: 'Апрель'},
      {value: '05', text: 'Май'},
      {value: '06', text: 'Июнь'},
      {value: '07', text: 'Июль'},
      {value: '08', text: 'Август'},
      {value: '09', text: 'Сентябрь'},
      {value: '10', text: 'Октябрь'},
      {value: '11', text: 'Ноябрь'},
      {value: '12', text: 'Декабрь'},
    ];
  }

  ngOnInit() {
    this.renewDistrictsList();
  }

  renewDistrictsList() {
    this.districtNames = [
      {value: '1157000000', text: 'Пермский край'},
    ];
    /* TODO; too long initialisation - needs to FIX */
    /*let limit: number = 0;
    this.apiService.request('settings/districts').then(data => {
      if (data.success && data.result) {
        Object.keys(data.result).forEach(districtKey => {

          if (limit > 10) return;
          limit++;

          this.districtNames.push({
            value: data.result[districtKey]['dist_code'], // code
            text: data.result[districtKey]['dist_name'],
          });
        });
      }
    });*/
  }


  onSubmit() {
    if (this.isEditMode) {
      this.userService.edit(Object.assign({}, this.registrationForm.value))
        .then((data: any) => {
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
      if (this.isEditMode) {
        if (this.autoSave) clearTimeout(this.autoSave);
        this.autoSave = setTimeout(() => {
          this.onSubmit();
        }, 1000);
      }
    });
  }

}
