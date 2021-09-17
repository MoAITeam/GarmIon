import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { PhotoService } from '../services/photo.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PreviewCorridorService } from '../services/preview-corridor.service';
import { ModelService } from '../services/model.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private requestObject : any = null;

  constructor(public photoService: PhotoService,
    private http:HTTP,
    private alertCtrl: AlertController,
    private router: Router,
    private previewCorridor: PreviewCorridorService,
    private modelService: ModelService
    ) { }

    async addPhotoToGallery() {

      this.modelService.categoryFilter = [];
      this.modelService.colorFilter = [];

      let values = await this.photoService.addNewToGallery(); 
      let photoID = values[0];
      let photo = values[1];
      this.previewCorridor.setPhoto(photo);
      this.previewCorridor.setPhotoID(photoID);

      this.router.navigate(['tabs/tab1/preview']);
      
  }

  filter(){
    let colorFilter = this.modelService.colorFilter;
    if (colorFilter.length==0)
      colorFilter = ['Blue','Red','Green'];
    let categoryFilter = this.modelService.categoryFilter;
    if (categoryFilter.length==0)
      categoryFilter = ['Top','Bottom'];
    this.modelService.filteredGarments = [];
    if (this.modelService.garments)
    for (let garment of this.modelService.garments){
      if(colorFilter.includes(garment.color)&&categoryFilter.includes(garment.category))
        this.modelService.filteredGarments.push(garment);
    }
  }

  async alertDisplay(){
    let alert = this.alertCtrl.create({
      message: 'Fai le foto per benino',
      buttons: [
        {
          text: 'fanculo',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Vabene',
          handler: () => {
            this.addPhotoToGallery();
          }
        }
      ]
    });
    (await alert).present();

  }

  async ngOnInit() {
    console.log('debug');
    await this.photoService.loadSaved();
    const outfitList = await Storage.get({ key: "outfits" });
    let outfits = JSON.parse(outfitList.value) || [];
    this.modelService.outfits = outfits;
    this.filter();


  }



    sendRequest() {
      // se non si mette .then capacitor generea un errore fastidioso!
      this.http.get('https://ionic.io', {},{})
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
     
  }

}


