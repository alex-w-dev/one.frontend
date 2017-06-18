import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ContentComponent
  ],
  declarations: [ContentComponent]
})
export class ContentModule { }
