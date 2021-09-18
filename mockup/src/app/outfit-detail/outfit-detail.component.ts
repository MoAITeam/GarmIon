import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Outfit } from '../outfit/outfit.component';
import { Garment } from '../garments/garments.component';
import { OutfitCorridorService } from '../services/outfit-corridor.service';
import { OutfitsForOutfitDetailService } from '../services/outfits-for-outfit-detail.service';
import { NavController } from '@ionic/angular/';
import { ModelService } from '../services/model.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-outfit-detail',
  templateUrl: './outfit-detail.component.html',
  styleUrls: ['./outfit-detail.component.scss'],
})





export class OutfitDetailComponent implements OnInit {

  public outfit:Outfit;
  public userGarment:Garment;
  public recommendedGarment:Garment;
  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private modelService: ModelService
  ) {}

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.outfit = this.modelService.outfits.find(h => h.id === id)!;
    let moodText = document.getElementById('mood-text');
    let eventText = document.getElementById('event-text');
    moodText.innerHTML = this.outfit.moodFilter;
    eventText.innerHTML = this.outfit.eventFilter;
  }

  getGarment(id:number) {
    return this.modelService.garments.find(garment => garment.id == id);
  }

  async delete() {
    // Fa molto schifo
    const outfitList = await Storage.get({ key: "outfits" });
    this.modelService.outfits = [];
    let outfits:Outfit[] = JSON.parse(outfitList.value) || [];
    let newOutFitList = [];
    for (let out of outfits){
      if (this.outfit.id!=out.id){
        newOutFitList.push(out);
        this.modelService.outfits.push(out);
      }
    }
    Storage.set({key: "outfits",value: JSON.stringify(newOutFitList)});
    this.navCtrl.navigateRoot("tabs/tab2");
  }

  edit() {

    //this.navCtrl.navigateRoot("tabs/tab2/outfit/edit/"+this.modelService.outfits[this.outfit].id);

  }

}
