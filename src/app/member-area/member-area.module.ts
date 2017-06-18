import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemberAreaComponent} from './member-area.component';
import {HeaderModule} from "../header/header.module";
import {LeftNavModule} from "../left-nav/left-nav.module";
import {ContentModule} from "../content/content.module";
import {FooterModule} from "../footer/footer.module";
import {MaterializeModule} from "../materializecss/materizalizecss.module";

import {UserService} from "../shared/services/user.service";
import {ApiService} from "../shared/services/api.service";
import {Http, ConnectionBackend, HttpModule} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from "../account/account.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {LoginComponent} from "../login/login.component";
import {HeaderUnloginedModule} from "../header-unlogined/header-unlogined.module";
import {RegistrationComponent} from "../registration/registration.component";
import {RegistrationModule} from "../registration/registration.module";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'account',
    component: AccountComponent,
    data: { title: 'Личный кабинет' }
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { title: 'Регистрация' }
  },
  { path: '',
    redirectTo: '/account',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    HeaderUnloginedModule,
    LeftNavModule,
    ContentModule,
    FooterModule,
    MaterializeModule,
    HttpModule,
    RegistrationModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    MemberAreaComponent,
  ],
  declarations: [MemberAreaComponent],
  providers: [
    UserService,
    ApiService,
  ]
})
export class MemberAreaModule {
}
