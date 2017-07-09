import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AccountComponent } from '../account/account.component';
import { RegistrationComponent } from '../registration/registration.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { PageInDevComponent } from '../page-in-dev/page-in-dev.component';
import { ClientListComponent } from '../client-list/client-list.component';
import { CooperationComponent } from '../cooperation/cooperation.component';
import { ScheduleComponent } from '../schedule/schedule.component';

export const memberAreaRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'account',
    component: AccountComponent,
    data: { title: 'Личный кабинет' }
  },
  {
    path: 'client-list',
    component: ClientListComponent,
    data: { title: 'Список клиентов' }
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    data: { title: 'Расписание' }
  },
  {
    path: 'cooperation',
    component: CooperationComponent,
    data: { title: 'Сотрудничество' }
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
  { path: 'site/:action/:id',
    redirectTo: '/dev',
    pathMatch: 'full'
  },
  { path: 'site/:action',
    redirectTo: '/dev',
    pathMatch: 'full'
  },
  { path: 'dev',
    component: PageInDevComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];
