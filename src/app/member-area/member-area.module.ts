import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AccountComponent } from '../account/account.component';
import { RegistrationComponent } from '../registration/registration.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';
import { HeaderUnloginedModule } from '../header-unlogined/header-unlogined.module';
import { LeftNavModule } from '../left-nav/left-nav.module';
import { ContentModule } from '../content/content.module';
import { FooterModule } from '../footer/footer.module';
import { HttpModule } from '@angular/http';
import { RegistrationModule } from '../registration/registration.module';
import { MemberAreaComponent } from './member-area.component';
import { UserService } from '../shared/services/user.service';
import { ApiService } from '../shared/services/api.service';

import { memberAreaRoutes } from './member-area.routes';
import { MaterializeModule } from 'angular2-materialize';
import { LoginModule } from '../login/login.module';



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
    LoginModule,
    RouterModule.forRoot(memberAreaRoutes)
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
