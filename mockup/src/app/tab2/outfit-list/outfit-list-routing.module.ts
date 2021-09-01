import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutfitListPage } from './outfit-list.page';

const routes: Routes = [
  {
    path: '',
    component: OutfitListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutfitListPageRoutingModule {}
