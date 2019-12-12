import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpGenelPage } from './sp-genel';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SpGenelPage,
  ],
  imports: [
    IonicPageModule.forChild(SpGenelPage),
    BrMaskerModule
  ],
})
export class SpGenelPageModule {}
