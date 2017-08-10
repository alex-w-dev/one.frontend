import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IRadioButton {
  id: string | number;
  name: string | number;
}

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  ngModelValue: string = '';

  @Input()
  get ngModel() {
    return this.ngModelValue;
  }

  set ngModel(value) {
    this.ngModelValue = value;
    this.onNgModelChanged.emit(this.ngModelValue);
  }

  @Output() onNgModelChanged: EventEmitter<string> = new EventEmitter();

  errorTextValue: string = '';

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
  @Input() className: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
