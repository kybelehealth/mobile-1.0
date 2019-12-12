import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyPage } from './nearby';

@NgModule({
  declarations: [
    NearbyPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyPage),
  ],
})
export class NearbyPageModule {}
