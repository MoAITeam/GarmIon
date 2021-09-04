import { Component } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public colorFilter:string[];

  constructor(public photoService: PhotoService) { }

    addPhotoToGallery() {
      this.photoService.addNewToGallery();
  }

  onColorChange($event) {
    this.colorFilter = $event.target.value ;

}



}


