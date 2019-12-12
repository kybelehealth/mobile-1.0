import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { BrMaskerModule } from 'brmasker-ionic-3';
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    BrMaskerModule
  ],
})
export class LoginPageModule {}
