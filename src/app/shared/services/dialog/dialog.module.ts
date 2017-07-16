import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWindowModule } from '../../components/modal/modal.module';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [CommonModule, MaterializeModule, ModalWindowModule, FormsModule],
  exports: [DialogComponent],
  declarations: [
    DialogComponent
  ],
  providers: [
    DialogService
  ],
})
export default class DialogModule {
}
