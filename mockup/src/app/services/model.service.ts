import { Injectable } from '@angular/core';
import { Garment } from '../garments/garments.component';
import { Outfit } from '../outfit/outfit.component';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

    public garments: Garment[];
    public filteredGarments: Garment[];
    public outfits: Outfit[];
    public categoryFilter: string[];
    public colorFilter: string[];

      constructor() {
        this.garments = [];
        this.outfits = [];
        this.categoryFilter = [];
        this.colorFilter = [];
       }

    }