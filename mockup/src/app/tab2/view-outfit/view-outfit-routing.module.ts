import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOutfitPage } from './view-outfit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOutfitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOutfitPageRoutingModule {}
