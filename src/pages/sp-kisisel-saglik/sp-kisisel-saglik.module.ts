import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpKisiselSaglikPage } from './sp-kisisel-saglik';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SpKisiselSaglikPage,
  ],
  imports: [
    IonicPageModule.forChild(SpKisiselSaglikPage),
    BrMaskerModule
  ],
})
export class SpKisiselSaglikPageModule {}
