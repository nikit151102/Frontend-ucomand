import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'card/:id', loadChildren: () => import('./components/view-card/view-card.module').then(m => m.ViewCardModule)
  },
  {
    path: 'user/:id', loadChildren: () => import('./components/user-account/user-account.module').then(m => m.UserAccountModule)
  },
  {
    path: 'myaccount/:id', loadChildren: () => import('./components/personal-account/personal-account.module').then(m => m.PersonalAccountModule)
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
    path: 'adminAccount', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
