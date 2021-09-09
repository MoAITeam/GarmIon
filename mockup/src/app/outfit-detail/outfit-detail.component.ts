import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Outfit } from '../outfit/outfit.component';
import { OUTFITS } from '../outfit-mockup';
import { Garment } from '../garments/garments.component';
import { OutfitCorridorService } from '../services/outfit-corridor.service';
import { OutfitsForOutfitDetailService } from '../services/outfits-for-outfit-detail.service';
import { NavController } from '@ionic/angular/';

@Component({
  selector: 'app-outfit-detail',
  templateUrl: './outfit-detail.component.html',
  styleUrls: ['./outfit-detail.component.scss'],
})





export class OutfitDetailComponent implements OnInit {

  public outfit:Outfit;
  public userGarment:Garment;
  public recommendedGarment:Garment;
  public selectedOutfits: Outfit[] = OUTFITS;
  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController

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

    let index:number = OUTFITS.indexOf(this.outfit,0);
    OUTFITS.splice(index,1);

  }

  edit() {

    this.navCtrl.navigateRoot("tabs/tab1/edit/"+this.outfit.id);

  }

}
