import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { Garment } from '../garments/garments.component';
import { PhotoService } from '../services/photo.service';
import { PreviewCorridorService } from '../services/preview-corridor.service';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-garment-preview',
  templateUrl: './garment-preview.page.html',
  styleUrls: ['./garment-preview.page.scss'],
})
export class GarmentPreviewPage implements OnInit {

  private garment:Garment;
  private photo:Photo;
  private photoID:Number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private previewCorridor: PreviewCorridorService,
    private modelService: ModelService
    
  ) {}

  ngOnInit() {
    this.photoID = this.previewCorridor.getPhotoID();
    this.photo = this.previewCorridor.getPhoto();
    this.garment = this.modelService.garments.find(h => h.id === this.photoID)!;
  }

  savePicture(){
    this.photoService.waitForCheck(this.photo);
    this.router.navigate(['tabs/tab1']);
  }

  exit() {
    let index = this.modelService.garments.findIndex(h => h.id === this.garment.id)!;

    this.modelService.garments.splice(index,1);

    this.router.navigate(['tabs/tab1']);

  }

}


