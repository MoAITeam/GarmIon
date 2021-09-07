import { Component, OnInit } from '@angular/core';
import { Garment } from '../garments/garments.component';
import { OUTFITS } from '../outfit-mockup';
import { OutfitCorridorService } from '../services/outfit-corridor.service';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss'],
})
export class OutfitComponent implements OnInit {

  public outfits = OUTFITS;
  public selectedOutfits : Outfit[];

  constructor(private outfitCorridorService : OutfitCorridorService) { }

  ngOnInit() {

    this.outfitCorridorService.receiveOutfits().subscribe(
      (outfits) => {
        this.selectedOutfits = outfits;
        
          
      }
  );
  }

}

export interface Outfitz {
  id: number,
  garments: Garment[]
}

export interface Outfit {
  id: number,
  userGarment: Garment,
  matchGarment: Garment,
}