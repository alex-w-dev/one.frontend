import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ISelectInputOption {
  value: string;
  text: string;
}

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit {
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

  @Input() options: ISelectInputOption[];
  @Input() name: string = '';
  @Input() className: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
