import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegistrationComponent} from './authentication/registration/registration.component';
import {AuthenticateComponent} from './authentication/authenticate/authenticate.component';
import {ManagementComponent} from './authentication/management/management.component';
import {ProfileComponent} from './authentication/profile/profile.component';
import {AdminComponent} from './authentication/admin/admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'www.seiti.co.uk', pathMatch: 'full'},
  { path: 'www.seiti.co.uk', component: DashboardComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: AuthenticateComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'admin', component: AdminComponent },
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404' }
];

// https://angular.dev/guide/routing/common-router-tasks
// https://medium.com/@yousafrazaravian/angular-route-level-providers-a-comprehensive-guide-094b6a247557
