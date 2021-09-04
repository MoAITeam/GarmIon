import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Outfit } from '../outfit/outfit.component';
import { OUTFITS } from '../outfit-mockup';

@Component({
  selector: 'app-outfit-detail',
  templateUrl: './outfit-detail.component.html',
  styleUrls: ['./outfit-detail.component.scss'],
})
export class OutfitDetailComponent implements OnInit {

  public outfit:Outfit;

  constructor(
    private route: ActivatedRoute,

  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.outfit = OUTFITS.find(h => h.id === id)!;
  }

}
