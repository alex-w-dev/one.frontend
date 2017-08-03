import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ISelectInputOption } from '../shared/components/form/select-input/select-input.component';
import { NgForm } from '@angular/forms';
import { IAnketaQuestion } from '../../interfaces';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/classes/user';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  @Input() isEditMode: boolean = false;

  @Input() roleType: string = 'patient';

  questions: IAnketaQuestion[] = [];

  typeValues: string | number = 0;

  @Input() user: User;

  submitted = false;

  active = true;

  /* example : {name: 'Name is required'} */
  formErrors = {} as any;

  questionsForm: NgForm;
  @ViewChild('questionsForm') currentForm: NgForm;

  constructor(private userService: UserService, private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.apiService.request('account/anketa', {'id_parent': 800}).then(data => {
      if (data.success && data.result && !!data.result.groups) {
        this.typeValues = 0;
        Object.keys(data.result.groups).forEach(questionKey => {
          this.questions.push({
            id_measure: data.result.groups[questionKey]['id_measure'],
            id_parent: data.result.groups[questionKey]['id_parent'],
            name: data.result.groups[questionKey]['name'],
            typevalue: data.result.groups[questionKey]['typevalue'],
            sort_order: data.result.groups[questionKey]['sort_order'],
            age_low: data.result.groups[questionKey]['age_low'],
            age_high: data.result.groups[questionKey]['age_high'],
            male: data.result.groups[questionKey]['male'],
            section: data.result.groups[questionKey]['section'],
          });
        });
      }
    });
  }

  loadAnketa(id_measure) {
    console.log(id_measure);
    this.questions = [];
    this.apiService.request('account/anketa', {'id_parent': id_measure}).then(data => {
      if (data.success && data.result && !!data.result.groups) {
        this.typeValues = 0;
        Object.keys(data.result.groups).forEach(questionKey => {
          this.questions.push({
            id_measure: data.result.groups[questionKey]['id_measure'],
            id_parent: data.result.groups[questionKey]['id_parent'],
            name: data.result.groups[questionKey]['name'],
            typevalue: data.result.groups[questionKey]['typevalue'],
            sort_order: data.result.groups[questionKey]['sort_order'],
            age_low: data.result.groups[questionKey]['age_low'],
            age_high: data.result.groups[questionKey]['age_high'],
            male: data.result.groups[questionKey]['male'],
            section: data.result.groups[questionKey]['section'],
          });
        });
      }
      if (data.success && data.result && !!data.result.questions) {
        this.typeValues = 1;
        Object.keys(data.result.questions).forEach(questionKey => {
          this.questions.push({
            id_measure: data.result.questions[questionKey]['id_measure'],
            id_parent: data.result.questions[questionKey]['id_parent'],
            name: data.result.questions[questionKey]['name'],
            typevalue: data.result.questions[questionKey]['typevalue'],
            sort_order: data.result.questions[questionKey]['sort_order'],
            age_low: data.result.questions[questionKey]['age_low'],
            age_high: data.result.questions[questionKey]['age_high'],
            male: data.result.questions[questionKey]['male'],
            section: data.result.questions[questionKey]['section'],
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.userService.edit(Object.assign({}, this.questionsForm.value))
        .then((data: any) => {
          this.userService.afterGetUserFromServer(data.result);
        })
        .catch((data) => {
          this.formErrors = data.result;
        });
      this.submitted = true;
    } else {
      this.userService.register(Object.assign({}, this.questionsForm.value, { type: this.user.type.replace('patient', 'pacient') }))
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
  }
}
