import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditProjectsComponent } from './create-edit-projects.component';


const routes: Routes = [
  {
    path: '', component: CreateEditProjectsComponent,
  },
  { path: '**', redirectTo: '/error' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class CreateEditProjectsRoutingModule { }
