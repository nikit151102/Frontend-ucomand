import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { AuthGuard } from './components/personal-account/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'news',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'aboutUs', loadChildren: () => import('./components/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'tariffs', loadChildren: () => import('./components/page-tariffs/page-tariffs.module').then(m => m.PageTariffsModule)
  },
  {
    path: 'notifications', loadChildren: () => import('./components/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'CreateProject', loadChildren: () => import('./components/projects/create-edit-projects/create-edit-projects.module').then(m => m.CreateEditProjectsModule), data: { edit: false }
  },
    {
    path: 'editProject/:nickname', loadChildren: () => import('./components/projects/create-edit-projects/create-edit-projects.module').then(m => m.CreateEditProjectsModule),data: { edit: true }
  },
  {
    path: 'resume/:id', loadChildren: () => import('./components/view-card/view-card.module').then(m => m.ViewCardModule), data: { routeName: 'resume' }
  },
  {
    path: 'vacancy/:id', loadChildren: () => import('./components/view-card/view-card.module').then(m => m.ViewCardModule), data: { routeName: 'vacancy' }
  },
  {
    path: 'project/:id', loadChildren: () => import('./components/projects/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: ':id', loadChildren: () => import('./components/user-path/user-path.module').then(m => m.UserPathModule)
  },
  {
    path: 'myaccount/:id', loadChildren: () => import('./components/personal-account/personal-account.module').then(m => m.PersonalAccountModule), canActivate: [AuthGuard]
  },
  {
    path: 'error/', component: PageErrorComponent
  },
  {
    path: 'error/:id', component: PageErrorComponent
  },
  { path: '**', redirectTo: '/error' }
];

// Define extra options separately
const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top',
  paramsInheritanceStrategy: 'always'  // Include paramsInheritanceStrategy if needed
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],  // Pass only two arguments
  exports: [RouterModule]
})
export class AppRoutingModule { }
