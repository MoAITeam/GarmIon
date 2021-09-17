import { Component, Input, OnInit } from '@angular/core';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-garments',
  templateUrl: './garments.component.html',
  styleUrls: ['./garments.component.scss'],
})

export class GarmentsComponent implements OnInit {

  @Input()
  colorFilter: string[];
  @Input()
  categoryFilter: string[];

  selectedGarment?: Garment;

  public filteredGarments: Garment[];
  onSelect(garment: Garment): void {
    this.selectedGarment = garment;
  }
  
  constructor(private modelService: ModelService) {
    
   }

  ngOnInit() {
    this.modelService.garments = [];
    this.filteredGarments=this.modelService.garments;
  }

  ngOnChanges(){
    this.filteredGarments = [];
    if (this.modelService.garments)
    for (let garment of this.modelService.garments){
      if(this.colorFilter.includes(garment.color)&&this.categoryFilter.includes(garment.category))
        this.filteredGarments.push(garment);
    }
  }


}

export interface Garment {
  id: number;
  name: string;
  link: string;
  color: string;
  category: string;
}
