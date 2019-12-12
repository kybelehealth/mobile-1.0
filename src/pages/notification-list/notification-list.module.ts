import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationListPage } from './notification-list';

@NgModule({
  declarations: [
    NotificationListPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationListPage),
  ],
})
export class NotificationListPageModule {}
