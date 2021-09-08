import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Outfit } from '../outfit/outfit.component';
import { OUTFITS } from '../outfit-mockup';
import { Garment } from '../garments/garments.component';
import { OutfitCorridorService } from '../services/outfit-corridor.service';
import { OutfitsForOutfitDetailService } from '../services/outfits-for-outfit-detail.service';

@Component({
  selector: 'app-outfit-detail',
  templateUrl: './outfit-detail.component.html',
  styleUrls: ['./outfit-detail.component.scss'],
})





export class OutfitDetailComponent implements OnInit {

  public outfit:Outfit;
  public userGarment:Garment;
  public recommendedGarment:Garment;
  public selectedOutfits: Outfit[] = [{id:2,userGarment:{id: 14, name: 'VIPTits' , link: 'https://www.net-a-porter.com/variants/images/6630340699385535/in/w2000.jpg', color: 'Red',category:'top'},matchGarment:{id: 11, name: 'BeautifulBottom', link: 'https://www.net-a-porter.com/variants/images/6630340699385535/in/w2000.jpg', color: 'Blue',category:'top'}}];

  constructor(
    private route: ActivatedRoute,
    private outfitsForOutfitDetailService : OutfitsForOutfitDetailService

  ) {}

  ngOnInit() {

        

  /*  this.outfitsForOutfitDetailService.receiveOutfits().subscribe(
      (outfits) => {
        this.selectedOutfits = outfits;
          
      }
  ); */

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.outfit = this.selectedOutfits.find(h => h.id === id)!;
    this.userGarment = this.outfit.userGarment;
    this.recommendedGarment = this.outfit.matchGarment;

  }

  delete() {

  }

}
