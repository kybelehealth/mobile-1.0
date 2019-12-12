import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeOnboardPage } from './welcome-onboard';
import { SuperTabsModule } from 'ionic2-super-tabs';


@NgModule({
  declarations: [
    WelcomeOnboardPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(WelcomeOnboardPage),
  ],
})
export class WelcomeOnboardPageModule {}
