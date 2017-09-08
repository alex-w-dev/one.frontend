import { AfterContentChecked, AfterViewChecked, Component, Input, OnInit, Output, ViewChild, OnDestroy  } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { IAnketaQuestion, ISetTests, ISetAnswer, IAnketaOptionValues, IUser } from '../../interfaces';
import { UserService } from '../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})

export class QuestionnaireComponent implements OnInit, OnDestroy {

  @Input() roleType: string = 'patient';

  questions: IAnketaQuestion[] = [];
  group: IAnketaQuestion[] = [];
  answer: ISetAnswer[] = [];
  user_id: string | number = '';
  typeValues: string | number = 0;
  user: IUser;
  showSaveButton = true;
  id_measure: number = 0;
  active = true;
  isPatient = true;
  remove = false;
  male: string = '';

  questionsForm: NgForm;
  @ViewChild('questionsForm') currentForm: NgForm;

  private subscription: Subscription;

  constructor (private userService: UserService, private apiService: ApiService, private router: Router, private dialogService: DialogService, private route: ActivatedRoute, private _router: Router) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => this.id_measure = params['id_measure']);
    this.user = this.userService.getUser(this);
    this.male = <string>this.user.male;
    if(this.user){
      if(this.user.isPartner()){
        this.id_measure = 800;
        this.isPatient = false;
        this.showSaveButton = false;
      }
    }

    this.apiService.request('account/anketa', {'id_parent': this.id_measure}).then(data => {
      if (data.success && data.result && !!data.result.groups) {
        this.typeValues = 0;
        Object.keys(data.result.groups).forEach(questionKey => {
          if( data.result.groups[questionKey]['male'] === '2' || data.result.groups[questionKey]['male'] === this.male) {
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
          }
        });
      }
    });
  }

  getAnketa(id_measure) {
    this.id_measure = id_measure;
    if( this.id_measure == 800 && this.isPatient){
      this.showSaveButton = false;
    }
    this.questions = [];
    this.apiService.request('account/anketa', {'id_parent': this.id_measure}).then(data => {

       console.log(data);
       console.log(this.questions);

      if (data.success && data.result && !!data.result.groups) {
        this.typeValues = 0;
        Object.keys(data.result.groups).forEach(questionKey => {
          if( data.result.groups[questionKey]['male'] === '2' || data.result.groups[questionKey]['male'] === this.male) {
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
          }
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
          if( data.result.questions[questionKey]['male'] === '2' || data.result.questions[questionKey]['male'] === this.male) {
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
              array_key: i,
              children: []
            });


            // делает сет чайлдов
            this.setChildrenSection(this.questions[i].children, data.result.questions[questionKey]['children']);

            if (data.result.questions[questionKey].values != null) {
              this.questions[i].values = [];
              Object.keys(data.result.questions[questionKey].values).forEach(valueKey => {
                this.questions[i].values.push({
                  id: data.result.questions[questionKey].values[valueKey]['id_valnominal'],
                  name: data.result.questions[questionKey].values[valueKey]['valnominal'],
                  value_group: data.result.questions[questionKey].values[valueKey]['id_measure'],
                  id_measure: data.result.questions[questionKey].values[valueKey]['id_measure'],
                  id_valnominal: data.result.questions[questionKey].values[valueKey]['id_valnominal'],
                  sort_order: data.result.questions[questionKey].values[valueKey]['sort_order'],
                  valnominal: data.result.questions[questionKey].values[valueKey]['valnominal'],
                });
              });
            }
            let answerValue: number | string = '';
            if (data.result.questions[questionKey]['value'] !== null) {
              answerValue = data.result.questions[questionKey]['value']['value'];
            }
            if (data.result.questions[questionKey]['typevalue'] == 2 && data.result.questions[questionKey]['value'] == null) {
              if (!!this.questions[i].values[0]) {
                answerValue = this.questions[i].values[0].id;
              }
            }
            this.answer.push({
              type_value: data.result.questions[questionKey]['typevalue'],
              value: answerValue,
              measure_id: data.result.questions[questionKey]['id_measure'],
            });
            i++;
          }
        });
      }
    });
  }

  setChildrenSection(parent, children) {
    let j = 0;
    if(children.length > 0){
      Object.keys(children).forEach(childrenKey =>{
        if( children[childrenKey]['male'] === '2' || children[childrenKey]['male'] === this.male) {
          parent.push({
            id_measure: children[childrenKey]['id_measure'],
            id_parent: children[childrenKey]['id_parent'],
            name: children[childrenKey]['name'],
            typevalue: children[childrenKey]['typevalue'],
            sort_order: children[childrenKey]['sort_order'],
            age_low: children[childrenKey]['age_low'],
            age_high: children[childrenKey]['age_high'],
            male: children[childrenKey]['male'],
            section: children[childrenKey]['section'],
            children: [],
            array_key: j,
          });
          this.setChildrenSection(parent[j].children, children[childrenKey]['children']);

          if (children[childrenKey].values != null) {
            parent[j].values = [];
            Object.keys(children[childrenKey].values).forEach(childrenValueKey => {
              parent[j].values.push({
                id: children[childrenKey].values[childrenValueKey]['id_valnominal'],
                name: children[childrenKey].values[childrenValueKey]['valnominal'],
                value_group: children[childrenKey].values[childrenValueKey]['id_measure'],
                id_measure: children[childrenKey].values[childrenValueKey]['id_measure'],
                id_valnominal: children[childrenKey].values[childrenValueKey]['id_valnominal'],
                sort_order: children[childrenKey].values[childrenValueKey]['sort_order'],
                valnominal: children[childrenKey].values[childrenValueKey]['valnominal'],
              });
            });
          }
          let answerValue: number | string = '';
          if (children[childrenKey]['value'] !== null) {
            answerValue = children[childrenKey]['value']['value'];
          }
          if (children[childrenKey]['typevalue'] == 2 && children[childrenKey]['value'] == null) {
            if (!!parent[j].values[0]) {
              // answerValue = parent[j].values[0].id;
            }
          }
          this.answer.push({
            type_value: children[childrenKey]['typevalue'],
            value: answerValue,
            measure_id: children[childrenKey]['id_measure'],
          });
          j++;
        }
       });
    }
  }

  checkboxClick(key, question)  {
    this.answer[key].value = this.answer[key].value.length == '' ? [] : this.answer[key].value ;
    this.remove = false;
    if(this.answer[key].value.length > 0){
      for( let j = 0; j < this.answer[key].value.length; j++){
        if(this.answer[key].value[j] == question.id){
          this.answer[key].value.splice(j, 1);
          this.remove = true;
        }
      }
    }
    if(this.remove == false){
      this.answer[key].value.push(question.id);
    }
  }

  changeUrl(id) {
    this._router.navigate(["/questionnaire", id]);
    this.getAnketa(id);
  }

  onSubmit() {
    console.log(this.answer);
    this.apiService.request('account/set-tests-results', {'user_id': this.user_id, 'measure_data': JSON.stringify(this.answer)}).then(data => {
      if(data.success) {
        if(this.isPatient){
          this.dialogService.alert('Вы успешно добавили информацию "' + this.group[0].name + '"');
        } else {
          this.dialogService.alert('Вы успешно добавили результаты анализов "' + this.group[0].name + '" для пациента (ИД ' + this.user_id + ')');
        }
        this.router.navigate(['/account']);
      }
    });
  }
}
