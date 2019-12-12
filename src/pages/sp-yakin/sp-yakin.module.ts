import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpYakinPage } from './sp-yakin';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SpYakinPage,
  ],
  imports: [
    IonicPageModule.forChild(SpYakinPage),
    BrMaskerModule
  ],
})
export class SpYakinPageModule {}
