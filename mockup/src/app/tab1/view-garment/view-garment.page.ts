import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-garment',
  templateUrl: './view-garment.page.html',
  styleUrls: ['./view-garment.page.scss'],
})
export class ViewGarmentPage implements OnInit {
  id: Number|undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
  }

}
