import { Component, OnInit } from '@angular/core';
import { Garment } from '../garment';
import { OUTFITS } from '../outfit-mockup';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss'],
})
export class OutfitComponent implements OnInit {

  public outfits = OUTFITS;

  constructor() { }

  ngOnInit() {}

}

export interface Outfit {
  id: number,
  garments: Garment[]
}