import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaglikProfilimPage } from './saglik-profilim';

@NgModule({
  declarations: [
    SaglikProfilimPage,
  ],
  imports: [
    IonicPageModule.forChild(SaglikProfilimPage),
  ],
})
export class SaglikProfilimPageModule {}
