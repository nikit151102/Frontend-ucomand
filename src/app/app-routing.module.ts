import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { AuthGuard } from './components/personal-account/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'resume/:id', loadChildren: () => import('./components/view-card/view-card.module').then(m => m.ViewCardModule)
  },
  {
    path: 'vacancy/:id', loadChildren: () => import('./components/view-card/view-card.module').then(m => m.ViewCardModule)
  },
  {
    path: 'user/:id', loadChildren: () => import('./components/user-account/user-account.module').then(m => m.UserAccountModule)
  },
  {
    path: 'myaccount/:id', loadChildren: () => import('./components/personal-account/personal-account.module').then(m => m.PersonalAccountModule), canActivate: [AuthGuard]
  },
  {
    path: 'newResume', loadChildren: () => import('./components/form/form.module').then(m => m.FormModule)
  },
  {
    path: 'newVacancy', loadChildren: () => import('./components/form/form.module').then(m => m.FormModule)
  },
  {
    path: 'aboutUs', loadChildren: () => import('./components/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'notifications', loadChildren: () => import('./components/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'adminAccount', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'error', component:PageErrorComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' , scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
