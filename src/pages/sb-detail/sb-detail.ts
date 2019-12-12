import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlogItem } from '../../entity/blog/blog';

@IonicPage()
@Component({
  selector: 'page-sb-detail',
  templateUrl: 'sb-detail.html',
})
export class SbDetailPage {
  blogItem : BlogItem;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.blogItem = <BlogItem> navParams.get('blogItem');
  }

}
