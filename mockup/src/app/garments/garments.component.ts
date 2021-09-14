import { Component, Input, OnInit } from '@angular/core';
import { GARMENTS } from '../mock-garments';
import { Photo } from '../services/photo.service';

@Component({
  selector: 'app-garments',
  templateUrl: './garments.component.html',
  styleUrls: ['./garments.component.scss'],
})

export class GarmentsComponent implements OnInit {

  @Input()
  colorFilter: string[];
  @Input()
  categoryFilter: string[];

  public garments = GARMENTS;
  selectedGarment?: Garment;
  public filteredGarments: Garment[];
  onSelect(garment: Garment): void {
    this.selectedGarment = garment;
  }
  
  constructor() {
   }

  ngOnInit() {
    this.filteredGarments=this.garments;
  }

  ngOnChanges(){
    this.filteredGarments = [];
    for (let garment of this.garments){
      if(this.colorFilter.includes(garment.color)&&this.categoryFilter.includes(garment.category))
        this.filteredGarments.push(garment);
    }
  }


}

export interface Garment {
  id: number;
  name: string;
  link: string;
  color: string;
  category: string;
}
