import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAccountComponent } from './personal-account.component';



const routes: Routes = [
  { path: '', component: PersonalAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalAccountRoutingModule { }
