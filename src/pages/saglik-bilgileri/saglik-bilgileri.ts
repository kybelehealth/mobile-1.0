import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { BlogProvider } from '../../providers/blog';
import { BlogItem } from '../../entity/blog/blog';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-saglik-bilgileri',
  templateUrl: 'saglik-bilgileri.html',
})
export class SaglikBilgileriPage {
  translation:any={};
  isLoading:boolean=true;
  blogList : BlogItem[];
  constructor(public navCtrl: NavController,
    private loadingCtrl:LoadingController,
    private blogProvider:BlogProvider) {
  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Health Profile')[0];
    this.translation=translationSource.Translation;
    let loading = this.loadingCtrl.create({content:MyApp.loadingMsg});
    loading.present();
    this.blogProvider.blogList().subscribe((result)=>{
      loading.dismiss();
      this.blogList=result.Result;
      this.isLoading=false;
    });
  }
 

  openDetail(blogItem : BlogItem) {
    this.navCtrl.push("SbDetailPage",{ blogItem : blogItem });
  }
}
