import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsiTakvimiPage } from './asi-takvimi';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [
    AsiTakvimiPage,
  ],
  imports: [
    IonicPageModule.forChild(AsiTakvimiPage),
    CalendarModule
  ],
})
export class AsiTakvimiPageModule {}
