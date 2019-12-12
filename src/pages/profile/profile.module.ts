import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    BrMaskerModule
  ],
})
export class ProfilePageModule {}
