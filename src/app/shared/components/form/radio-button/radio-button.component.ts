import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {createNgModuleFactory} from "@angular/core/src/view";

export interface IRadioButton {
  id: string | number;
  name: string | number;
  value_group?: string | number;
}

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})

export class RadioButtonComponent implements OnInit {

  form = new FormGroup({
    food: new FormControl('lamb'),
  });

  ngModelValue: string = '';

  @Input()
  get ngModel() {
    return this.ngModelValue;
  }

  set ngModel(value) {
    this.ngModelValue = value;
    this.onNgModelChanged.emit(this.ngModelValue);
  }

  errorTextValue: string = '';
  selectedOption: number | string;

  @Output() onNgModelChanged: EventEmitter<string> = new EventEmitter();

  @Input()
  get errorText() {
    return this.errorTextValue;
  }

  set errorText(value) {
    this.errorTextValue = value;
    this.onErrorTextChanged.emit(this.errorTextValue);
  }

  @Output() onErrorTextChanged: EventEmitter<string> = new EventEmitter();

  @Input() options: IRadioButton[];
  @Input() name: string = '';
  @Input() controlName: number = 1;
  @Input() className: string = '';

  constructor() {
  }

  onSelectionChange(option) {
    this.selectedOption = option;
    this.ngModelValue = option;
    this.onNgModelChanged.emit(this.ngModelValue);
    // return this.selectedOption;
  }

  getValue() {
    return this.selectedOption;
  }

  ngOnInit() {
  }

}
