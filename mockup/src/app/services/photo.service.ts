import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {GARMENTS} from '../mock-garments';



@Injectable({
  providedIn: 'root'
})


export class PhotoService{ 

  public photos: Photo[] = [];

  constructor() { 

  }
  
  public async addNewToGallery() {
  // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });

  this.photos.unshift({
    filepath: "soon...",
    webviewPath: capturedPhoto.webPath
  });

  GARMENTS.push({
    id: Math.random(),
    name: "garment",
    link : capturedPhoto.webPath
  });
}
}

 


export interface Photo {
  filepath: string;
  webviewPath: string;
}



