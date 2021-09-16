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
export class OutfitSaverService {

  constructor() { }

}

