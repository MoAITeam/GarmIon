import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'outfit-list',
    loadChildren: () => import('./outfit-list/outfit-list.module').then( m => m.OutfitListPageModule)
  },
  {
    path: 'view-outfit',
    loadChildren: () => import('./view-outfit/view-outfit.module').then( m => m.ViewOutfitPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
