import { Injectable } from '@angular/core';
import { Garment } from '../garments/garments.component';
import { Outfit } from '../outfit/outfit.component';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

    public garments: Garment[];
    public outfits: Outfit[];

      constructor() {
        this.garments = [];
        this.outfits = [];
       }

    }