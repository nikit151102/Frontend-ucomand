import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLendingComponent } from './public-lending.component';


const routes: Routes = [
  { path: '', component: PublicLendingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLendingRoutingModule { }
