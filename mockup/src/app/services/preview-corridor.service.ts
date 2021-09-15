import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PreviewCorridorService {

  public photoID:Number;
  public photo:Photo;

  constructor() {
  }

  setPhotoID (photoID) {
      this.photoID = photoID;
  }

  getPhotoID(){
    return this.photoID;
  }

  setPhoto(photo) {
    this.photo = photo;
  }

  getPhoto() {
    return this.photo;
  }


}
