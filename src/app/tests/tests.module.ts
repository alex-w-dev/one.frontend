import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests.component';
import { FormsModule } from '@angular/forms';
import { TextInputModule } from '../shared/components/form/text-input/text-input.module';
import { SelectInputModule } from '../shared/components/form/select-input/select-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextInputModule,
    SelectInputModule,
  ],
  exports: [
    TestsComponent
  ],
  declarations: [TestsComponent]
})
export class TestsModule { }
