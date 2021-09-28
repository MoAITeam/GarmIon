import { Injectable } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import {DomSanitizer,SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Garment } from '../garments/garments.component';
import { AlertController, Platform } from '@ionic/angular';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';
import { ModelService } from './model.service';

import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
import { PreviewCorridorService } from '../services/preview-corridor.service';



@Injectable({
  providedIn: 'root'
})


export class PhotoService{ 

  public color:string;
  public category:string;
  public season:string;
  public id: number;
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;
  public garments:Garment[];
  public garment:Garment;
  public outfitColorFilter:string;
  public outfitEventFilter: string;
  public outfitMoodFilter: string;
  private base:string;
  public result;

  constructor(platform: Platform, private modelService: ModelService, private http:HTTP,) {
    this.garments = modelService.garments;
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

    let base64Data = await this.readAsBase64(cameraPhoto);
    base64Data = this.base;
    console.log('this.base'+this.base);
    //base64Data = this.base;

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
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
    console.log('loading saved');
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
        this.modelService.garments.unshift({
          id: pars.id,
          name: "garment",
          link: `${pars.photo}`,
          color: pars.color,
          category:pars.category,
          season:pars.season,
        });
      }
      console.log(this.modelService.garments);
    }
    else{
    for (let photo of this.photos) {
      // Read each saved photo's data from the Filesystem
      this.modelService.garments.unshift({
        id: photo.id,
        name: "garment",
        link: photo.webviewPath,
        color: photo.color,
        category:photo.category,
        season:photo.season,
      });
    }
    console.log(this.modelService.garments);
  }

  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
 
    });

    this.sendRequest(await this.readAsBase64(capturedPhoto));
    
    this.id=(((1+Math.random())*0x10000)|0);
    this.garment = {
      id: this.id,
      name: "garment",
      link: 'https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg',
      color: null,
      category: null,
      season: null,
    };
      
    return [this.id,capturedPhoto];

}

sendRequest(image) {
  /*var formData = new FormData();
  formData.append('image',image)


this.http.sendRequest('http://192.168.43.62:5000/getBase64Picture', {
    method: "post",
    data: formData,
    headers: {},
    timeout: 60,
})
    .then(response => {
        this.base=response.data.status;
    })
    .catch(error => {
        console.log(error);
    });
}*/

  this.http.post('http://192.168.43.62:5000/getBase64Picture', {'image':image},{'Content-Type':'application/json'}).then(data => {
        let par = JSON.parse(data.data);
        console.log(par);
        this.base = par.status;
        this.garment = {
          id: this.id,
          name: "garment",
          link: 'data:image/png;base64,'+this.base,
          color: null,
          category: null,
          season: null,
        };
    })
    this.http.post('http://192.168.43.62:5000/getRecommendations', {'image':image},{'Content-Type':'application/json'}).then(data => {
        let par = JSON.parse(data.data);
        console.log(par);
        this.result = par;
        Storage.set({
          key: String(this.garment.id),
          value: data.data
        });
    })
}

public async waitForCheck(capturedPhoto){

      this.garment.color = this.color;
      this.garment.category = this.category;
      this.garment.season = this.season;
      this.modelService.garments.unshift(this.garment);
      this.modelService.filteredGarments.unshift(this.garment);

      console.log(this.garment);

      // Save the picture and add it to photo collection
      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photos.unshift({
        filepath: savedImageFile.filepath,
        webviewPath: savedImageFile.webviewPath,
        color:this.color,
        category:this.category,
        season:this.season,
        id:this.garment.id
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
  color:string;
  category:string;
  season:string;
  id:number
}
