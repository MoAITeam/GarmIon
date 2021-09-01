import { Component, OnInit, Input } from '@angular/core';
import {Garment} from '../garment';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {GARMENTS} from '../mock-garments';

@Component({
  selector: 'app-garment-detail',
  templateUrl: './garment-detail.component.html',
  styleUrls: ['./garment-detail.component.scss'],
})
export class GarmentDetailComponent implements OnInit {

  public garment : Garment;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.garment = GARMENTS.find(h => h.id === id)!;
  }

}
