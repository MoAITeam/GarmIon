import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Outfit } from '../outfit/outfit.component';

@Injectable({
  providedIn: 'root'
})
export class OutfitsForOutfitDetailService {

  public outfitCollection:Outfit[];
  private outfitSent : Subject<Outfit[]>;

  constructor() {
      this.outfitSent = new Subject<Outfit[]>();
  }

  sendOutfits(outfits: Outfit[]): void {
    this.outfitSent.next(outfits);
}

  receiveOutfits(): Observable<Outfit[]> {
    return this.outfitSent;
}
}
