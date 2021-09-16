import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Garment } from '../garments/garments.component';
import { OUTFITS } from '../outfit-mockup';
import { OutfitCorridorService } from '../services/outfit-corridor.service';
import { OutfitsForOutfitDetailService } from '../services/outfits-for-outfit-detail.service';


@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss'],
})


export class OutfitComponent implements OnInit {

  public selectedOutfits : Outfit[] = OUTFITS; 

  constructor(private outfitCorridorService : OutfitCorridorService,
    private OutfitsForOutfitDetailService : OutfitsForOutfitDetailService,

    ) { }

  ngOnInit() {

    
    
    
    
    //this.selectedOutfits = this.store.outfits.value;
    



    

  /*  this.outfitCorridorService.receiveOutfits().subscribe(
      (outfits) => {
        this.selectedOutfits = outfits;
        this.OutfitsForOutfitDetailService.sendOutfits(this.selectedOutfits);
          
      }
  );  DEVE ESSERE CORRETTO*/

    


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
