import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOutfitPageRoutingModule } from './view-outfit-routing.module';

import { ViewOutfitPage } from './view-outfit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOutfitPageRoutingModule
  ],
  declarations: [ViewOutfitPage]
})
export class ViewOutfitPageModule {}
