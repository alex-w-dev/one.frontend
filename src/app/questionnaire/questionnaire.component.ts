import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ISelectInputOption } from '../shared/components/form/select-input/select-input.component';
import { NgForm } from '@angular/forms';
import { IAnketaQuestion, ISetTests, ISetAnswer, IAnketaOptionValues, IUser } from '../../interfaces';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/classes/user';
import { ApiService } from '../shared/services/api.service';
import { DialogService } from '../shared/services/dialog/dialog.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  @Input() roleType: string = 'patient';

  questions: IAnketaQuestion[] = [];
  group: IAnketaQuestion[] = [];
  answer: ISetAnswer[] = [];
  user_id: string | number;
  typeValues: string | number = 0;
  user: IUser;
  showSaveButton = true;

  active = true;

  /* example : {name: 'Name is required'} */
  formErrors = {} as any;

  questionsForm: NgForm;
  @ViewChild('questionsForm') currentForm: NgForm;

  constructor(private userService: UserService, private apiService: ApiService, private router: Router, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.apiService.request('account/anketa', {'id_parent': 0}).then(data => {
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
            answered: {
              need: data.result.groups[questionKey]['answered']['need'],
              answered: data.result.groups[questionKey]['answered']['answered'],
              proc: data.result.groups[questionKey]['answered']['proc'],
            }
          });
        });
      }
    });

    this.user = this.userService.getUser(this);
  }

  loadAnketa(id_measure) {
    if( id_measure == 800){
      this.showSaveButton = false;
    }
    this.questions = [];
    this.apiService.request('account/anketa', {'id_parent': id_measure}).then(data => {
      // console.log(data.result);
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
            answered: {
              need: data.result.groups[questionKey]['answered']['need'],
              answered: data.result.groups[questionKey]['answered']['answered'],
              proc: data.result.groups[questionKey]['answered']['proc'],
            }
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
        let i = 0;
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
            array_key : i,
          });

          if( data.result.questions[questionKey].values != null){
            this.questions[i].values = [];
            Object.keys(data.result.questions[questionKey].values).forEach(valueKey => {
              this.questions[i].values.push({
                id: data.result.questions[questionKey].values[valueKey]['id_valnominal'],
                name: data.result.questions[questionKey].values[valueKey]['valnominal'],
                value_group : data.result.questions[questionKey].values[valueKey]['id_measure'],
                id_measure: data.result.questions[questionKey].values[valueKey]['id_measure'],
                id_valnominal: data.result.questions[questionKey].values[valueKey]['id_valnominal'],
                sort_order: data.result.questions[questionKey].values[valueKey]['sort_order'],
                valnominal: data.result.questions[questionKey].values[valueKey]['valnominal'],
              });
            });
            console.log(this.questions);
          }

          let answerValue: number | string = '';
          if( data.result.questions[questionKey]['value'] !== null){
            answerValue = data.result.questions[questionKey]['value']['value'];
          }
          this.answer.push({
            type_value: data.result.questions[questionKey]['typevalue'],
            value : answerValue,
            measure_id: data.result.questions[questionKey]['id_measure'],
          });
          i++;
        });
      }
      console.log(this.questions);
    });

  }

  getWidth(width): any {
    return { 'width': width + '%'};
  }

  onSubmit() {
    console.log(this.answer);

    /*this.apiService.request('account/set-tests-results-for-partners', {'user_id': this.user_id, 'measure_data': JSON.stringify(this.answer)}).then(data => {
      if(data.success) {
        this.dialogService.alert('Вы успешно добавили результаты анализов "' + this.group[0].name + '" для пациента (ИД ' + this.user_id + ')');
        this.router.navigate(['/account']);
      }
    });*/
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
  }
}
