import { Component, Input, OnInit } from '@angular/core';
import { GARMENTS } from '../mock-garments';

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
  onSelect(garment: Garment): void {
    this.selectedGarment = garment;
  }
  
  constructor() {
   }

  ngOnInit() {
  }


}

export interface Garment {
  id: number;
  name: string;
  link: string;
  color: string;
  category: string;
}
