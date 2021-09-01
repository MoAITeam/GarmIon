import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab2/outfits',
        loadChildren: () => import('../tab2/outfit-list/outfit-list.module').then(m => m.OutfitListPageModule)
      },
      {
        path: 'tab1/garments/:id',
        loadChildren: () => import('../tab1/view-garment/view-garment.module').then(m => m.ViewGarmentPageModule)
      },
      {
        path: 'tab2/outfits/:id',
        loadChildren: () => import('../tab2/view-outfit/view-outfit.module').then(m => m.ViewOutfitPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
