import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar'
import * as moment from 'moment';
//import 'moment/locale/tr';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-asi-takvimi',
  templateUrl: 'asi-takvimi.html',
})
export class AsiTakvimiPage {
  translation : any ={};
  type: 'string';
  locale : string ="tr-TR";
  date: string; // string[] = ['2019-02-03', '2019-02-16', '2019-02-20', '2019-02-28', '2019-03-03', '2019-03-10'];

  options: CalendarComponentOptions = {
    pickMode: 'multi',
    weekStart:1,
    monthPickerFormat:['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'],
    weekdays:['Paz','Pzt','Sal','Çar','Per','Cum','Cmt']
  };

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {

    if(MyApp.currentLanguage=="en"){
      this.locale = "en-US";
      this.options.monthPickerFormat = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      this.options.weekdays = ["Sun","Mon","Tue","Wed",'Thu','Fri','Sat']
    }else if(MyApp.currentLanguage=="ar"){
      this.locale = "ar-AR";
      this.options.monthPickerFormat = ['يناير','فبراير','مارس','إبريل','مايو','يونيه','يوليه','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
      this.options.weekdays = [ "أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت" ];
	
    }

    //moment('tr-TR');    

  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Vaccine Calendar')[0];
    this.translation=translationSource.Translation;
  }

  onChange($event) {
    console.log($event);
  }

  openModal() {
    let modal = this.modalCtrl.create("AtModalPage", {showBackdrop: true}, { cssClass: 'mini-modal' });
    modal.onDidDismiss((result)=>{
      
    });
    modal.present(); 
  }

}
