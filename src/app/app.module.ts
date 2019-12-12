import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TextMaskModule } from 'angular2-text-mask';


import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SuperTabsModule } from 'ionic2-super-tabs';

import localeTr from "@angular/common/locales/tr";
import { registerLocaleData } from "@angular/common";
import { ApiProvider } from '../providers/api';
import { CommonProvider } from '../providers/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AccountProvider } from '../providers/account';
import { MemberProvider } from '../providers/member';
import { QuestionProvider } from '../providers/question';
import { HomePage } from '../pages/home/home';
import { BlogProvider } from '../providers/blog';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { OneSignal } from '@ionic-native/onesignal';
import { Globalization } from '@ionic-native/globalization';
import { CallNumber } from '@ionic-native/call-number';
registerLocaleData(localeTr);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    TextMaskModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      backButtonText: '',
      iconMode: 'ios',
      tabbarPlacement: 'bottom',
      pageTransition: 'ios'
     }),
     IonicStorageModule.forRoot({name: '__hera_db',
      driverOrder: ['sqlite', 'websql', 'indexeddb']}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    Camera,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide: LOCALE_ID, useValue:"tr"},
    // {provide: LOCALE_ID, useValue:"en"},
    // {provide: LOCALE_ID, useValue:"ar"},
    ApiProvider,
    CommonProvider,
    AccountProvider,
    MemberProvider,
    QuestionProvider,
    BlogProvider,
    LaunchNavigator,
    Globalization
  ]
})
export class AppModule {}
