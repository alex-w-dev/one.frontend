import {
  Component, OnInit, ViewEncapsulation, OnDestroy
} from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogComponentParams } from '../../../../interfaces';

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, OnDestroy {

  isOpenModal: boolean;
  defaultParams: DialogComponentParams;
  params: DialogComponentParams;

  constructor(private dialogService: DialogService) {
    this.isOpenModal = false;
    this.defaultParams = {
      mode: 'alert',
      text: '',
      title: '',
      promptValue: '',
      cancelBtnText: 'Cancel',
      okBtnText: 'Ok',
    };
    this.params = Object.assign({}, this.defaultParams);
  }

  ngOnInit() {
    this.dialogService.onDialog.subscribe( data => {
      this.params = Object.assign({}, this.defaultParams, data);
      this.openModal();
    });
  }

  ngOnDestroy(): void {
    this.cancelModal();
  }

  handleOpenChange(isOpen) {
    if (!isOpen) {
      this.cancelModal();
    }
  }

  cancelModal() {
    this.dialogService.onResolve.emit(false);
    this.closeModal();
  }

  closeModal() {
    this.isOpenModal = false;
  }

  openModal() {
    this.isOpenModal = true;
  }

  applyModal() {
    switch (this.params.mode) {
      case 'prompt':
        this.dialogService.onResolve.emit(this.params.promptValue);
        break;
      default: /* alert and confirm */
        this.dialogService.onResolve.emit(true);
        break;
    }
    this.closeModal();
  }
}
