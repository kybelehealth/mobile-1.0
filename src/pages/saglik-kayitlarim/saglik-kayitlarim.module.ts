import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaglikKayitlarimPage } from './saglik-kayitlarim';

@NgModule({
  declarations: [
    SaglikKayitlarimPage,
  ],
  imports: [
    IonicPageModule.forChild(SaglikKayitlarimPage),
  ],
})
export class SaglikKayitlarimPageModule {}
