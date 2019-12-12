import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-user-data-agg',
  templateUrl: 'user-data-agg.html',
})
export class UserDataAggPage {
  translation : any = {};
  lang : String = "tr";
  onlyShow : boolean = false;
  constructor(public navCtrl: NavController,public navParams:NavParams, private superTabsCtrl: SuperTabsController) {
    this.lang = MyApp.currentLanguage;
    this.onlyShow = this.navParams.get('onlyShow') || false;
  }
  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='User Agreement')[0];
    this.translation=translationSource.Translation;
  }
  next(){
    this.superTabsCtrl.slideTo(2);
  }

}
