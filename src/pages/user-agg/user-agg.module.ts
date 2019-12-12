import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAggPage } from './user-agg';

@NgModule({
  declarations: [
    UserAggPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAggPage),
  ],
})
export class UserAggPageModule {}
