import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { PhotoService } from '../services/photo.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PreviewCorridorService } from '../services/preview-corridor.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public colorFilter:['Blue','Red'];
  private requestObject : any = null;

  constructor(public photoService: PhotoService,
    private http:HTTP,
    private alertCtrl: AlertController,
    private router: Router,
    private previewCorridor: PreviewCorridorService
    ) { }

    async addPhotoToGallery() {
      let values = await this.photoService.addNewToGallery(); 
      let photoID = values[0];
      let photo = values[1];
      this.previewCorridor.setPhoto(photo);
      this.previewCorridor.setPhotoID(photoID);

      this.router.navigate(['tabs/tab1/preview']);
      
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


