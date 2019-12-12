import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpCocukEklePage } from './sp-cocuk-ekle';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SpCocukEklePage,
  ],
  imports: [
    IonicPageModule.forChild(SpCocukEklePage),
    BrMaskerModule
  ],
})
export class SpCocukEklePageModule {}
