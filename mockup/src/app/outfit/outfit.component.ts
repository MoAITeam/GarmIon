import { Component, Input, OnInit } from '@angular/core';
import { Garment } from '../garments/garments.component';
import { ModelService } from '../services/model.service';
import { OutfitCorridorService } from '../services/outfit-corridor.service';
import { OutfitsForOutfitDetailService } from '../services/outfits-for-outfit-detail.service';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss'],
})


export class OutfitComponent implements OnInit {

  constructor(private outfitCorridorService : OutfitCorridorService,
    private OutfitsForOutfitDetailService : OutfitsForOutfitDetailService,
    private modelService: ModelService
    ) {}

 ngOnInit() {
   
  }

  getGarment(id:number) {
    return this.modelService.garments.find(garment => garment.id == id).link;
  }

}

export interface Outfit {
  id: number,
  userGarment: number,
  matchGarment: number,
  moodFilter: string,
  eventFilter: string,
}
