import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {GARMENTS} from '../mock-garments';
import {DomSanitizer,SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Garment } from '../garment';





@Injectable({
  providedIn: 'root'
})


export class PhotoService{ 

  public photos: Photo[] = [];
  public garments:Garment[] = GARMENTS;
  constructor(private sanitizer: DomSanitizer) { 

  }
  
  public async addNewToGallery() {
  // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
  ;

/*this.photos.unshift({
    id: Math.random(),
    filepath: "soon...",
    webviewPath: capturedPhoto.webPath
  });*/
    this.garments.unshift({
    id: Math.random(),
    name: "garment",
    link: capturedPhoto.webPath
  });


}
}

 


export interface Photo {
  id: Number;
  filepath: string;
  webviewPath: string;
}



