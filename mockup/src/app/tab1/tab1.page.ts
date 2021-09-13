import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public colorFilter:['Blue','Red'];
  private requestObject : any = null;

  constructor(public photoService: PhotoService,
    private http:HTTP) { }

    addPhotoToGallery() {
      this.photoService.addNewToGallery();
  }

  async ngOnInit() {
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


