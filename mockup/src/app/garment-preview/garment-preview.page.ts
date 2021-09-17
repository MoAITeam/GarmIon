import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { Garment } from '../garments/garments.component';
import { PhotoService } from '../services/photo.service';
import { PreviewCorridorService } from '../services/preview-corridor.service';
import { ModelService } from '../services/model.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-garment-preview',
  templateUrl: './garment-preview.page.html',
  styleUrls: ['./garment-preview.page.scss'],
})
export class GarmentPreviewPage implements OnInit {

  private garment:Garment;
  private photo:Photo;
  private photoID:Number;
  private garmentColor:string;
  private garmentCategory:string;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertCtrl: AlertController,
    private previewCorridor: PreviewCorridorService,
    private modelService: ModelService
    
  ) {}

  ngOnInit() {
    this.photoID = this.previewCorridor.getPhotoID();
    this.photo = this.previewCorridor.getPhoto();
    this.garment = this.photoService.garment;
  }

  savePicture(){
    if(this.garmentCategory == null || this.garmentColor == null){
      this.alertDisplay();
    }

    else{
      console.log('roba');
      this.photoService.color = this.garmentColor;
      this.photoService.category = this.garmentCategory;
      this.photoService.waitForCheck(this.photo);
      this.router.navigate(['tabs/tab1']);
    }

  }

  exit() {
    let index = this.modelService.garments.findIndex(h => h.id === this.garment.id)!;

    this.modelService.garments.splice(index,1);

    this.router.navigate(['tabs/tab1']);

  }

  colorChange($event) {
    this.garmentColor = $event.target.value;
    console.log(this.garmentColor);

  }

  categoryChange($event) {
    this.garmentCategory = $event.target.value;
    console.log(this.garmentCategory);

  }

  async alertDisplay(){
    let alert = this.alertCtrl.create({
      message: 'Non hai messo tutti i dati FAVAH!',
      buttons: [
        {
          text: 'ok scus',
          role: 'ok',

        }
      ]
    });
    (await alert).present();

  }

}


