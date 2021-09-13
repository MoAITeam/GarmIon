import { Injectable } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import {GARMENTS} from '../mock-garments';
import {DomSanitizer,SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Garment } from '../garments/garments.component';
import { AlertController } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})


export class PhotoService{ 

  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";


  public garments:Garment[] = GARMENTS;
  public capturedPhoto;
  constructor(private sanitizer: DomSanitizer,
    public alertController: AlertController
    ) {}

    private async readAsBase64(cameraPhoto: CameraPhoto) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();
    
      return await this.convertBlobToBase64(blob) as string;
    }
    
    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
    

    private async savePicture(cameraPhoto: CameraPhoto) { 

       // Convert photo to base64 format, required by Filesystem API to save
      const base64Data = await this.readAsBase64(cameraPhoto);

      // Write the file to the data directory
      const fileName = new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data
      });

      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }


  public async addNewToGallery() {
  // Take a photo

  let dismiss:boolean;
/* 
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Attenzione',
    subHeader: 'Come Scattare',
    message: 'Per avere un risultato migliore,poni i tuoi vestiti su uno sfondo uniforme',
    buttons: [
      {
        text: 'Cancella',
        role: 'cancel',
        handler: () => {
          dismiss = true;
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Scatta',
        handler: () => {
          this.shotPhoto();
        }
        
      }
    ]
  });

  await alert.present();
  */

  this.capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
  ;

  const savedImageFile = await this.savePicture(this.capturedPhoto);
  this.photos.unshift({
    id: Math.random(),
    filepath: savedImageFile.filepath,
    webviewPath: savedImageFile.webviewPath
  });



  
  Storage.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos)
  });


  

/*this.garments.unshift({
    id: Math.random(),
    name: "garment",
    link: this.capturedPhoto.webPath,
    color: 'Red',
    category:'top',
    photo: savedImageFile*/




}

public async loadSaved() {
  // Retrieve cached photo array data
  const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
  this.photos = JSON.parse(photoList.value) || [];

  // Display the photo by reading into base64 format
  for (let photo of this.photos) {
    // Read each saved photo's data from the Filesystem
    const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
    });

    // Web platform only: Load the photo as base64 data
    photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;}
}
}

 


export interface Photo {
  id: Number;
  filepath: string;
  webviewPath: string;
}



