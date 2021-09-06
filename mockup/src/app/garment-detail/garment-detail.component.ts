import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {GARMENTS} from '../mock-garments';
import { DomSanitizer } from '@angular/platform-browser';
import { Garment } from '../garments/garments.component';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-garment-detail',
  templateUrl: './garment-detail.component.html',
  styleUrls: ['./garment-detail.component.scss'],
})
export class GarmentDetailComponent implements OnInit {

  @ViewChild('slider') sliderComponent:IonSlides;

  public garment : Garment;
  public matchGarments: string[];


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer : DomSanitizer
  ) {}
    
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.garment = GARMENTS.find(h => h.id === id)!;
    this.matchGarments = [
      'https://www.net-a-porter.com/variants/images/11452292647496505/in/w2000.jpg',
      'https://www.net-a-porter.com/variants/images/11452292647496505/in/w2000.jpg',
      'https://www.net-a-porter.com/variants/images/11452292647496505/in/w2000.jpg'
    ]
  }

  save(){
    let async_id = this.sliderComponent.getActiveIndex();
    async_id.then( id => {
      console.log(this.matchGarments[id]);
      //TUTTO IL CODICE DEVE STAR QUI DENTRO E VIENE ESEGUITO SU UN THREAD ASINCRONO
      //PUOI ANCHE AVVIARLO SU ALTRE FUNZIONI MA VANNO RICHIAMATE DA QUI

    });
    
    
  }

}
function value(value: any): (value: number) => number | PromiseLike<number> {
  throw new Error('Function not implemented.');
}

