import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MemberAreaModule } from './member-area/member-area.module';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { PageInDevComponent } from './page-in-dev/page-in-dev.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    PageNotFoundComponent,
    PageInDevComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MemberAreaModule,
    RouterModule
  ],
  exports: [
    BrowserModule,
    MemberAreaModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
