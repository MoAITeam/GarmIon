import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GarmentPreviewPage } from './garment-preview.page';

const routes: Routes = [
  {
    path: '',
    component: GarmentPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarmentPreviewPageRoutingModule {}
