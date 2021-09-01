import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewGarmentPageRoutingModule } from './view-garment-routing.module';

import { ViewGarmentPage } from './view-garment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewGarmentPageRoutingModule
  ],
  declarations: [ViewGarmentPage]
})
export class ViewGarmentPageModule {}
