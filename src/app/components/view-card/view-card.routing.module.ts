import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCardComponent } from './view-card.component';
import { RouteResolverServiceService } from './route-resolver-service.service';


const routes: Routes = [
  { path: '', component: ViewCardComponent, resolve: { data: RouteResolverServiceService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCardRoutingModule { }
