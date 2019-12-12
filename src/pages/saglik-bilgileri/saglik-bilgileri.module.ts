import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaglikBilgileriPage } from './saglik-bilgileri';

@NgModule({
  declarations: [
    SaglikBilgileriPage,
  ],
  imports: [
    IonicPageModule.forChild(SaglikBilgileriPage),
  ],
})
export class SaglikBilgileriPageModule {}
