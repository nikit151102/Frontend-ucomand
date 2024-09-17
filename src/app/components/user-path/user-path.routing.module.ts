import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPathComponent } from './user-path.component';
import { AuthGuard } from '../personal-account/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: UserPathComponent,
        children: [
          {
            path: 'profile',
            loadChildren: () => import('../../components/user-account/user-account.module').then(m => m.UserAccountModule)
          },
          {
            path: 'account',
            loadChildren: () => import('../../components/personal-account/personal-account.module').then(m => m.PersonalAccountModule),
            canActivate: [AuthGuard] 
          }
        ]
      }
      
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPathRoutingModule { }
