import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { DialogComponentParams } from '../../interfaces';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

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
