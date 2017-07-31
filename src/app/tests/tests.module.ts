import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TestsComponent
  ],
  declarations: [TestsComponent]
})
export class TestsModule { }
