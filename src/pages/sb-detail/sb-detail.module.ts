import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SbDetailPage } from './sb-detail';

@NgModule({
  declarations: [
    SbDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SbDetailPage),
  ],
})
export class SbDetailPageModule {}
