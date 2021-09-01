import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewGarmentPage } from './view-garment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewGarmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewGarmentPageRoutingModule {}
