import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    // './materilize.rem.scss',
    '../../node_modules/ubuntu-fontface/_ubuntu-base.scss',
    '../../node_modules/bootstrap/scss/bootstrap.scss',
    'biogenom-theme.scss',
    'app.component.scss',
  ],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'app';
}
