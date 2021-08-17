import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";
import {HTTP} from '@ionic-native/http';
import {decode} from "base64-arraybuffer";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
    });
    const fileName = new Date().getTime() + ".jpeg";
    if(window.hasOwnProperty("cordova")){
    HTTP.sendRequest('http://192.168.43.62:8000/pictures/',
      {
        method: 'post',
        data: { picId: 666, image: cameraPhoto.base64String },
        //headers: { Authorization: 'OAuth2: token' },
        timeout: 5000
      }
    )
      .then(response => {
        // prints 201
        console.log(response.status);
        let responsed = JSON.parse(response.data);
        const newPhotos = [
          {
            filepath: fileName,
            webviewPath: 'data:image/jpeg;base64,'+cameraPhoto.base64String, 
          },
          {
            filepath: fileName,
            webviewPath: 'http://192.168.43.62:8000/'+responsed['recommended garments'][0]['image'],
          },
          {
            filepath: fileName,
            webviewPath: 'http://192.168.43.62:8000/'+responsed['recommended garments'][1]['image'],
          },
          ...photos,
          ];
          setPhotos(newPhotos);
      })
      .catch(response => {
        // prints 403
        console.log(response);

        // prints Permission denied
        console.log(response);
      });}
      else{
        // Se non siamo su mobile, riempi comunque l'array di qualcosa
        console.log('debug');
        const newPhotos = [
          {
            filepath: fileName,
            webviewPath: 'data:image/jpeg;base64,'+cameraPhoto.base64String, 
          },
          {
            filepath: fileName,
            webviewPath: 'data:image/jpeg;base64,'+cameraPhoto.base64String,
          },
          {
            filepath: fileName,
            webviewPath: 'data:image/jpeg;base64,'+cameraPhoto.base64String,
          },
          ...photos,
          ];
          setPhotos(newPhotos);
      }
  };

  return {
    photos, takePhoto
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}