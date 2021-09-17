import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Garment } from '../garments/garments.component';
import { IonSlides } from '@ionic/angular';
import { Outfit, OutfitComponent } from '../outfit/outfit.component';
import { OutfitCorridorService } from '../services/outfit-corridor.service';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';
import { ModelService } from '../services/model.service';
import { Key } from 'selenium-webdriver';

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
  public outfits: Outfit[];
  public outfit : Outfit;
  public opt : String;
  platform: any;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer : DomSanitizer,
    private outfitCorridorService : OutfitCorridorService,
    private modelService: ModelService
  ) {}

    
  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.opt = String(this.route.snapshot.paramMap.get('opt'));
    this.lovedOutfit = [];
    if (this.opt==='detail'){
        this.garment = this.modelService.garments.find(h => h.id === id)!;
        this.matchGarments = [
          this.modelService.garments[0],
          this.modelService.garments[0],
          this.modelService.garments[0],
          ];      
        }

      /*if (this.opt==='edit'){
        this.outfit = this.modelService.outfits.find(h => h.id === id)!;
        this.garment = this.outfit.userGarment;
        this.matchGarments = [
        {  id: 1, name: 'TeslaTits', link: 'https://www.net-a-porter.com/variants/images/6630340699385535/in/w2000.jpg', color: 'Red',category:'bottom'},
        { id: 2, name: 'Cosciona99', link: 'https://www.net-a-porter.com/variants/images/11452292647496505/in/w2000.jpg',color: 'Blue',category:'top'},
        { id: 3, name: 'Banana33', link: 'https://www.net-a-porter.com/variants/images/6630340699385535/in/w2000.jpg',color: 'Red',category:'top'}
        ];
      }*/
    }

  save(){


    let async_id = this.sliderComponent.getActiveIndex();
    async_id.then( async id => {

      if(this.opt==='edit'){

      }
    let icon = document.getElementById('heart-icon');
    if(icon.getAttribute('name') === 'heart-outline') {

      let data = {id:(((1+Math.random())*0x10000)|0),
        userGarment:this.garment.id,
        matchGarment:this.matchGarments[id].id};
  
      const outfitList = await Storage.get({ key: "outfits"});
      this.outfits = JSON.parse(outfitList.value) || [];
      this.outfits.push(data);
        console.log('dd');
        Storage.set({
          key: "outfits",
          value: JSON.stringify(this.outfits)
        });
  
        this.modelService.outfits.unshift(data);
        icon.setAttribute('name','heart');

    }

    else {
      // RIMUOVE DA OUTFIT
      console.log('deleting');
      icon.setAttribute('name','heart-outline');

      const outfitList = await Storage.get({ key: "outfits" });
      this.modelService.outfits = [];
      let outfits:Outfit[] = JSON.parse(outfitList.value) || [];
      let newOutFitList = [];
      for (let out of outfits){
        if ((this.garment.id!=out.userGarment)||(this.matchGarments[id].id!=out.matchGarment)){
          newOutFitList.push(out);
          this.modelService.outfits.push(out);
        }
      }
      Storage.set({key: "outfits",value: JSON.stringify(newOutFitList)});

    }


      
    });
    
    
  }

   slideChange() {
    let async_id = this.sliderComponent.getActiveIndex();
    console.log("slide changed");

    async_id.then( id => {
      let findOutfit = false;
      for (let outfit of this.modelService.outfits){
        if((outfit.userGarment==this.garment.id)&&(outfit.matchGarment==this.matchGarments[id].id))
          findOutfit = true;
      }

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

