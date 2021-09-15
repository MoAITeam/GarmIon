import { Injectable } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import {GARMENTS} from '../mock-garments';
import {DomSanitizer,SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Garment } from '../garments/garments.component';
import { AlertController, Platform } from '@ionic/angular';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})


export class PhotoService{ 

  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;

  public garments:Garment[] = GARMENTS;
  constructor(platform: Platform) {
    this.platform = platform;
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
    

  // Save picture to file on device
  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    //let base64Data = await this.readAsBase64(cameraPhoto);
    let base64Data = "{\"id\":\"Math.random()\",\"photo\":\""+await this.readAsBase64(cameraPhoto)+"\"}";
    //let base64Data = '{"id":"Math.random()","photo":"ecco"}';

    console.log('d');
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.sav';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }


  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];
  
    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data
        });
  
        // Web platform only: Load the photo as base64 data
        let pars = JSON.parse(readFile.data);
        photo.webviewPath = `${pars.photo}`;
      }
    }

    for (let photo of this.photos) {
      this.garments.unshift({
        id: Math.random(),
        name: "garment",
        link: photo.webviewPath,
        color: 'Red',
        category:'top',
      });
    }

  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 5,
 
    });

    let photoID = Math.random();

      
    this.garments.unshift({
      id: photoID,
      name: "garment",
      link: capturedPhoto.webPath,
      color: 'Red',
      category:'top',
    });


    return [photoID,capturedPhoto];



}
public async waitForCheck(capturedPhoto){

      // Save the picture and add it to photo collection
      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photos.unshift({
        filepath: savedImageFile.filepath,
        webviewPath: savedImageFile.webviewPath
      });
  
      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos)
      });

}

}



export interface Photo {
  filepath: string;
  webviewPath: string;
}



