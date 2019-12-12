import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';

@IonicPage()
@Component({
  selector: 'page-welcome-onboard',
  templateUrl: 'welcome-onboard.html',
})
export class WelcomeOnboardPage {
  page1: any = "UserAggPage";
  page2: any = "UserDataAggPage";
  page3: any = "SpGenelPage";
  page4: any = "SpYakinPage";
  page5: any = "SpKisiselSaglikPage";
  page6: any = "SpCocukPage";
  page7: any = "SpHamilelikPage";


  page1class: any = "";
  page2class: any = "";
  page3class: any = "";
  page4class: any = "";
  page5class: any = "";
  page6class: any = "";
  page7class: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    
  }


  slideToIndex(index: number) {
    this.superTabsCtrl.slideTo(index);
  }

  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    if(ev.index==0){
      this.page1class = "";
      this.page2class = "";
      this.page3class = "";
      this.page4class = "";
      this.page5class = "";
      this.page6class = "";
      this.page7class = "";
    }
    else if(ev.index==1){
      this.page1class = "checkmark-circle";
      this.page2class = "";
      this.page3class = "";
      this.page4class = "";
      this.page5class = "";
      this.page6class = "";
      this.page7class = "";
    }
    else if(ev.index==2){
      this.page1class = "checkmark-circle";
      this.page2class = "checkmark-circle";
      this.page3class = "";
      this.page4class = "";
      this.page5class = "";
      this.page6class = "";
    }
    else if(ev.index==3){
      this.page1class = "checkmark-circle";
      this.page2class = "checkmark-circle";
      this.page3class = "checkmark-circle";
      this.page4class = "";
      this.page5class = "";
      this.page6class = "";
      this.page7class = "";
    }
    else if(ev.index==4){
      this.page1class = "checkmark-circle";
      this.page2class = "checkmark-circle";
      this.page3class = "checkmark-circle";
      this.page4class = "checkmark-circle";
      this.page5class = "";
      this.page6class = "";
      this.page7class = "";
    }
    else if(ev.index==5){
      this.page1class = "checkmark-circle";
      this.page2class = "checkmark-circle";
      this.page3class = "checkmark-circle";
      this.page4class = "checkmark-circle";
      this.page5class = "checkmark-circle";
      this.page6class = "";
      this.page7class = "";
    }else if(ev.index==6){
      this.page1class = "checkmark-circle";
      this.page2class = "checkmark-circle";
      this.page3class = "checkmark-circle";
      this.page4class = "checkmark-circle";
      this.page5class = "checkmark-circle";
      this.page6class = "checkmark-circle";
      this.page7class = "";
    }
  }

}
