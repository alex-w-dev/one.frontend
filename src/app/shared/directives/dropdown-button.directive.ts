import { AfterViewInit, Directive, Input } from '@angular/core';

@Directive({
  selector: '[ropDownButton]'
})
export class DropDownButtonDirective implements AfterViewInit {
  @Input() target: string;

  constructor() { }

  ngAfterViewInit(): void {

  }

}
