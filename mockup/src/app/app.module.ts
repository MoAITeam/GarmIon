import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
=======
>>>>>>> parent of 49a8996 (a)


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, !environment.production ? StoreDevtoolsModule.instrument() : []],
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
>>>>>>> parent of 49a8996 (a)
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },HTTP],
  bootstrap: [AppComponent],
})
export class AppModule {}
