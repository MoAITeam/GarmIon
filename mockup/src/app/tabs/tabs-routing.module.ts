import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { GarmentDetailComponent } from '../garment-detail/garment-detail.component';
import { OutfitDetailComponent } from '../outfit-detail/outfit-detail.component';

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
        path: 'tab1/:opt/:id',
        component: GarmentDetailComponent
      },
      {
        path: 'tab2/outfit/:id',
        component : OutfitDetailComponent
      },
      {
        path: 'tab2/:opt/:id',
        component: GarmentDetailComponent
      },
      {
        path: 'tab1/preview',
        loadChildren: () => import('../garment-preview/garment-preview.module').then(m => m.GarmentPreviewPageModule)    
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
