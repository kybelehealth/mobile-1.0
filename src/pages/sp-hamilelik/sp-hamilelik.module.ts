import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpHamilelikPage } from './sp-hamilelik';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SpHamilelikPage,
  ],
  imports: [
    IonicPageModule.forChild(SpHamilelikPage),
    BrMaskerModule
  ],
})
export class SpHamilelikPageModule {}
