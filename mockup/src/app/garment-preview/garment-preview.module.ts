import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GarmentPreviewPageRoutingModule } from './garment-preview-routing.module';

import { GarmentPreviewPage } from './garment-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GarmentPreviewPageRoutingModule
  ],
  declarations: [GarmentPreviewPage]
})
export class GarmentPreviewPageModule {}
