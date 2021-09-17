import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ModelService } from '../services/model.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modelService: ModelService) {}

  async ngOnInit(){
    const outfitList = await Storage.get({ key: "outfits" });
    let outfits = JSON.parse(outfitList.value) || [];
    this.modelService.outfits = outfits;
  }

}
