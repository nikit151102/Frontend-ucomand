import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTariffsComponent } from './page-tariffs.component';



const routes: Routes = [
  {
    path: '',
    component: PageTariffsComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageTariffsRoutingModule { }
