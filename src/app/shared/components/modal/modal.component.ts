import {
  Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, AfterViewInit
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'modal-window',
  styleUrls: ['modal.component.scss'],
  templateUrl: 'modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ModalWindow implements OnInit {
  @Input() confirm: {text: string, show: boolean, cantShow: boolean};
  @Input() get isOpen() {
    return this.isOpenValue;
  }
  set isOpen(isOpen) {
    if (!!isOpen === !!this.isOpenValue) return;
    this.isOpenValue = isOpen;
    this.isOpenChange.emit(isOpen);
    if (isOpen) {
      setTimeout(this.showModal.bind(this), 0);
    } else {
      setTimeout(this.closeModal.bind(this), 0);
    }
  }

  @Output() isOpenChange = new EventEmitter();


  isOpenValue: boolean = false;
  modalId: string;

  constructor() {
    this.modalId = `modal-${Date.now()}`;
  }

  saveTemplate(){
    console.log();
  }

  closeByCross() {
    this.isOpen = false;
  }

  showModal() {
    $('#' + this.modalId).show();
  }

  closeModal() {
    $('#' + this.modalId).hide();
  }

  ngOnDestroy() {
    $('.modal-overlay').remove();
  }

  ngAfterViewInit() {
  }

  ngOnInit() {}
}
