import { Component, OnInit } from '@angular/core';
import {Garment} from '../garment';
import { GARMENTS } from '../mock-garments';

@Component({
  selector: 'app-garments',
  templateUrl: './garments.component.html',
  styleUrls: ['./garments.component.scss'],
})

export class GarmentsComponent implements OnInit {
  public garments = GARMENTS;
  public colors : string[];
  selectedGarment?: Garment;
  onSelect(garment: Garment): void {
    this.selectedGarment = garment;
  }
  
  constructor() {
   }

  ngOnInit() {
  }


}
