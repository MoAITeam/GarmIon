import { Component, OnInit } from '@angular/core';
import { Garment } from '../garment';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss'],
})
export class OutfitComponent implements OnInit {

  public outfit:Garment[]=[]

  constructor() { }

  ngOnInit() {}

}
