import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Outfit } from '../outfit.component';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss'],
})


export class EmptyCartComponent implements OnInit,OnChanges {

  @Input() public selectedOutfits: Outfit[];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {


    if(this.selectedOutfits.length>0){
      document.getElementById('empty-cart').style.display = 'none';
      console.log('full');
    }
    else {
      document.getElementById('empty-cart').style.display = 'block';
      console.log('empty');

    }
  }

  ngOnInit() {}

}
