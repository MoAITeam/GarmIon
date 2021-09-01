import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutfitListPageRoutingModule } from './outfit-list-routing.module';

import { OutfitListPage } from './outfit-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutfitListPageRoutingModule
  ],
  declarations: [OutfitListPage]
})
export class OutfitListPageModule {}
