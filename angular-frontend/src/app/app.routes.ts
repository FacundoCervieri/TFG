import { Routes } from '@angular/router';

import { LandingComponent } from './modules/landing/landing.component';
import { TasksComponent } from './modules/tasks/tasks.component';

import { AuthGuard } from './core/guards/auth.guard';
import { CompanyGuard } from './core/guards/company.guard';
import { ClientGuard } from './core/guards/client.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'tasks', component: TasksComponent },

  {
    path: 'auth',
    children: [
      // { path: 'login', component: LoginComponent },
    ]
  },

  {
    path: 'company',
    canActivate: [AuthGuard, CompanyGuard],
    children: [
      // { path: 'dashboard', component: CompanyDashboardComponent },
    ]
  },

  {
    path: 'client',
    canActivate: [AuthGuard, ClientGuard],
    children: [
      // { path: 'dashboard', component: ClientDashboardComponent },
    ]
  },

  { path: '**', redirectTo: '' }
];
