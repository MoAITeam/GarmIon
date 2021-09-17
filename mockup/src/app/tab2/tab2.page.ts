import { Component } from '@angular/core';
import { ModelService } from '../services/model.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modelService: ModelService) {}

  async ngOnInit(){

  }

}
