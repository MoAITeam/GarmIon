import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  public outfit:number;
  public userGarment:Garment;
  public recommendedGarment:Garment;
  public selectedOutfits: Outfit[] = OUTFITS;
  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private router: Router

  ) {}

  ngOnInit() {

        

  /*  this.outfitsForOutfitDetailService.receiveOutfits().subscribe(
      (outfits) => {
        this.selectedOutfits = outfits;
          
      }
  ); */

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.outfit = this.selectedOutfits.findIndex(h => h.id === id)!;
    console.log(id);
    console.log(this.outfit);
    console.log(this.selectedOutfits);
    this.userGarment = this.selectedOutfits[this.outfit].userGarment;
    this.recommendedGarment = this.selectedOutfits[this.outfit].matchGarment;

  }

  delete() {

    OUTFITS.splice(this.outfit,1);
    this.router.navigate(['/tabs/tab2']);

  }

  edit() {

    this.navCtrl.navigateRoot("tabs/tab2/outfit/edit/"+this.selectedOutfits[this.outfit].id);

  }

}
