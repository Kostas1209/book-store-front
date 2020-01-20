import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveBookComponent } from './reserve-book.component';


const routes: Routes = [
  {
    path: '',
    component: ReserveBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveBookRoutingModule { }