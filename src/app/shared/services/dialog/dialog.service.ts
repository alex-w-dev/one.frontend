import { Injectable, EventEmitter } from '@angular/core';
import { DialogComponentParams, DialogParams } from '../../../../interfaces';

@Injectable()
export class DialogService {
  onDialog = new EventEmitter;
  onResolve = new EventEmitter;

  constructor() {}

  alert(data: string | DialogParams = '') {
    return this.promise(this.prepareParams('alert', data));
  }

  confirm(data: string | DialogParams = '') {
    return this.promise(this.prepareParams('confirm', data));
  }

  prompt(data: string | DialogParams = '', promptValue: string = '') {
    let params = this.prepareParams('prompt', data);
    if (promptValue) params.promptValue = promptValue;
    return this.promise(params);
  }

  prepareParams(mode, params: string | DialogParams) {
    let _params: DialogComponentParams;
    if (typeof params === 'string') {
      _params = {
        mode: mode,
        text: params,
      };
    } else {
      _params = Object.assign({ mode: mode }, params);
    }
    return _params;
  }

  promise(params: DialogComponentParams) {
    return new Promise((resolve, reject) => {
      this.onDialog.emit(params);
      this.onResolve.subscribe((data) => {
        resolve(data);
      });
    });
  }
}
