import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
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

    @Input() placeholder: string = '';
    @Input() name: string = '';
    @Input() className: string = '';

  constructor() { }

  ngOnInit() {
  }

}
