import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDataAggPage } from './user-data-agg';

@NgModule({
  declarations: [
    UserDataAggPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDataAggPage),
  ],
})
export class UserDataAggPageModule {}
