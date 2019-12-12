import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CommonProvider } from "../providers/common";
import { TranslationItem } from "../entity/translation/translationItem";
import { HomePage } from "../pages/home/home";
import { Globalization } from "@ionic-native/globalization";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  public static loadingMsg : string = "İşleminiz yapılırken, lütfen bekleyiniz...";
  public static currentLanguage: String = "en";
  public static translationSource : TranslationItem[] = [];
  @ViewChild(Nav) nav: Nav;
  rootPage: any;  
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private globalization:Globalization,
    private commonProvider:CommonProvider) {
      
      this.platform.ready().then(() => {
        this.initializeApp();       
      });
  }

  initializeApp() {    
      this.commonProvider.getLanguage().then((result)=>{
        if(result && result.length>0){
          MyApp.currentLanguage = result;
          
          this.setData();
        }else{

          this.globalization.getPreferredLanguage().then((langResult)=>{
            var deviceLang = langResult.value.split('-')[0].toLowerCase();
            if(deviceLang=='en' || deviceLang=='ar'){
              MyApp.currentLanguage=deviceLang;
            }else{
              MyApp.currentLanguage='tr';
            }
            this.setData();
          }).catch((error)=>{
            console.log(error);
            MyApp.currentLanguage='tr';
            this.setData();
          });


        }        
      });
  }

  setLoadingMessage(){
    switch (MyApp.currentLanguage) {
      case 'tr': MyApp.loadingMsg = "İşleminiz yapılırken, lütfen bekleyiniz.."; break;
      case 'ar': MyApp.loadingMsg = "يتم تنفيذ الأمر , لطفا انتظر"; break;
      default: MyApp.loadingMsg = "In progress, please wait."; break;
    }

  }

  setData(){
    this.platform.setDir( MyApp.currentLanguage=="ar" ? "rtl" :"ltr" , true);
    this.commonProvider.translation().subscribe((result)=>{
      MyApp.translationSource = result.Result;
      this.commonProvider.getMember().then((result)=>{
        if(result && result.MemberId && result.MemberId>0){
          this.rootPage = HomePage;
        } else{
          this.rootPage = "LoginPage";
        }
        this.setLoadingMessage();
        this.statusBar.hide();
        this.splashScreen.hide();   
      });
    });
  }
}
