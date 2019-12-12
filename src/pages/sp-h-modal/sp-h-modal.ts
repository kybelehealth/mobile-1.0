import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sp-h-modal',
  templateUrl: 'sp-h-modal.html',
})
export class SpHModalPage {
  week : number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.week = parseInt(navParams.get('week'));
    console.log("Modal => ",this.week);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpHModalPage');
  }

}
