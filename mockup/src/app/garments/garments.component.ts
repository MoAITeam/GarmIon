import { Component, OnInit } from '@angular/core';
import {Garment} from '../garment';

@Component({
  selector: 'app-garments',
  templateUrl: './garments.component.html',
  styleUrls: ['./garments.component.scss'],
})

export class GarmentsComponent implements OnInit {
  public garment: Garment = {
    id: 1,
    name: 'BeautifulTop'
  };
  constructor() {
   }

  ngOnInit() {
  }

}
