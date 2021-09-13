import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { OutfitComponent } from '../outfit/outfit.component';
import { OutfitDetailComponent } from '../outfit-detail/outfit-detail.component';
import { EmptyCartComponent } from '../outfit/empty-cart/empty-cart.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page,OutfitComponent,OutfitDetailComponent,EmptyCartComponent]
})
export class Tab2PageModule {}
