import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAccountComponent } from './personal-account.component';


const routes: Routes = [
  {
    path: '',
    component: PersonalAccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      {
        path: 'home',
        loadChildren: () => import('./personal-home/personal-home.module').then(m => m.PersonalHomeModule)
      },
      {
        path: 'personalData',
        loadChildren: () => import('./personal-data/personal-data.module').then(m => m.PersonalDataModule)
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalAccountRoutingModule { }
