import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ISelectInputOption } from '../shared/components/form/select-input/select-input.component';
import { NgForm } from '@angular/forms';
import { IAnketaQuestion, ISetTests } from '../../interfaces';
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
  group: IAnketaQuestion[] = [];
  answer: ISetTests;

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
      console.log(data.result);
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
        this.group.push({
          id_measure: data.result.group.id_measure,
          id_parent: data.result.group.id_parent,
          name: data.result.group.name,
          typevalue: data.result.group.typevalue,
          sort_order: data.result.group.sort_order,
          age_low: data.result.group.age_low,
          age_high: data.result.group.age_high,
          male: data.result.group.male,
          section: data.result.group.section,
        });
        console.log(this.group);
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
    this.apiService.request('account/set-tests-results-for-partners', {}).then(data => {

    });
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
  }
}
