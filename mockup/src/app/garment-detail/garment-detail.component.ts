import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Garment } from '../garments/garments.component';
import { IonSlides, NavController } from '@ionic/angular';
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
  private outfitEvent:string;
  private outfitColor:string;
  private outfitMood:string;
  platform: any;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer : DomSanitizer,
    private outfitCorridorService : OutfitCorridorService,
    private modelService: ModelService,
    public navCtrl: NavController,
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

      if (this.opt==='edit'){
        this.outfit = this.modelService.outfits.find(h => h.id === id)!;
        this.garment = this.modelService.garments.find(h => h.id === this.outfit.userGarment);
        this.matchGarments = [
          this.modelService.garments[0],
          this.modelService.garments[1],
          this.modelService.garments[2],
        ];
      }
    }

    colorChange($event) {
      this.outfitColor = $event.target.value;
  
    }
  
    moodChange($event) {
      this.outfitMood = $event.target.value;
  
    }

    eventChange($event) {
      this.outfitEvent = $event.target.value;
  
    }


  save(){

    if (this.opt=='edit'){
      let async_id = this.sliderComponent.getActiveIndex();
      async_id.then( async id => {
        const outfitList = await Storage.get({ key: "outfits"});
        this.outfits = JSON.parse(outfitList.value) || [];
        let newOutFitList = [];
        let data = {id:this.outfit.id,
          userGarment:this.garment.id,
          matchGarment:this.matchGarments[id].id,
          moodFilter:this.outfitMood,
          eventFilter: this.outfitEvent,
        };
        this.modelService.outfits = [];
        for (let out of this.outfits){
          if (out.id!=this.outfit.id){
            newOutFitList.push(out);
            this.modelService.outfits.push(out);
          }
          else {
            newOutFitList.push(data);
            this.modelService.outfits.push(data);
          }
        }
          console.log('dd');
          Storage.set({
            key: "outfits",
            value: JSON.stringify(newOutFitList)
          });
          this.navCtrl.navigateRoot("tabs/tab2/outfit/"+this.outfit.id);
      });
    }

    if (this.opt=='detail'){

      let async_id = this.sliderComponent.getActiveIndex();
      async_id.then( async id => {

      let icon = document.getElementById('heart-icon');
      if(icon.getAttribute('name') === 'heart-outline') {

        let data = {id:(((1+Math.random())*0x10000)|0),
          userGarment:this.garment.id,
          matchGarment:this.matchGarments[id].id,
          moodFilter:this.outfitMood,
          eventFilter: this.outfitEvent,
        };
    
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
    
  }

   slideChange() {
    let async_id = this.sliderComponent.getActiveIndex();
    console.log("slide changed");
    
    if (this.opt=='detail'){
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

}
function value(value: any): (value: number) => number | PromiseLike<number> {
  throw new Error('Function not implemented.');
}

