import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {GARMENTS} from '../mock-garments';
import { DomSanitizer } from '@angular/platform-browser';
import { Garment } from '../garments/garments.component';
import { IonSlides } from '@ionic/angular';
import { Outfit } from '../outfit/outfit.component';
import { OutfitCorridorService } from '../services/outfit-corridor.service';
import { OUTFITS } from '../outfit-mockup';

@Component({
  selector: 'app-garment-detail',
  templateUrl: './garment-detail.component.html',
  styleUrls: ['./garment-detail.component.scss'],
})
export class GarmentDetailComponent implements OnInit {

  @ViewChild('slider') sliderComponent:IonSlides;


  public garment : Garment;
  public matchGarments: Garment[];
  public lovedOutfit: Outfit[];


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer : DomSanitizer,
    private outfitCorridorService : OutfitCorridorService
  ) {}
    
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.garment = GARMENTS.find(h => h.id === id)!;
    this.lovedOutfit = [];
    this.matchGarments = [
    {  id: 1, name: 'TeslaTits', link: 'https://www.net-a-porter.com/variants/images/6630340699385535/in/w2000.jpg', color: 'Red',category:'bottom' },
    { id: 2, name: 'Cosciona99', link: 'https://www.net-a-porter.com/variants/images/6630340699385535/in/w2000.jpg',color: 'Blue',category:'top' },
    { id: 3, name: 'Banana33', link: 'https://www.net-a-porter.com/variants/images/6630340699385535/in/w2000.jpg',color: 'Red',category:'top' }
    ];
    }

  save(){
    let async_id = this.sliderComponent.getActiveIndex();

    async_id.then( id => {
      let lovedMatch = this.matchGarments.find(h=>h.id===(id+1))!;
      let randomID:number = Math.floor(Math.random() * 100000);
      console.log(randomID);
      let outfitToSave = {id: randomID, userGarment: this.garment, matchGarment: lovedMatch};
      this.lovedOutfit.push(outfitToSave);

      let icon = document.getElementById('heart-icon');
      icon.setAttribute('name','heart');
      console.log(icon);
      OUTFITS.push(outfitToSave);

      //this.outfitCorridorService.sendOutfits(this.lovedOutfit)   DEVE ESSERE CORRETTO PER FARE TUTTO CON IL SERVIZIO



      //TUTTO IL CODICE DEVE STAR QUI DENTRO E VIENE ESEGUITO SU UN THREAD ASINCRONO
      //PUOI ANCHE AVVIARLO SU ALTRE FUNZIONI MA VANNO RICHIAMATE DA QUI

    });
    
    
  }

  slideChange() {
    let async_id = this.sliderComponent.getActiveIndex();
    console.log("slide changed");

    async_id.then( id => {
      let lovedMatch = this.matchGarments.find(h=>h.id===(id+1))!;
      let findOutfit = this.lovedOutfit.find(v=>v.matchGarment.id===(id+1));
      let icon = document.getElementById('heart-icon');
      if (findOutfit){
        icon.setAttribute('name','heart');
      }
      else{
        icon.setAttribute('name','heart-outline');

      }
      

    });
  }

}
function value(value: any): (value: number) => number | PromiseLike<number> {
  throw new Error('Function not implemented.');
}

