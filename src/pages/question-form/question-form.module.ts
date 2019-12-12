import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionFormPage } from './question-form';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    QuestionFormPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionFormPage),
    BrMaskerModule
  ],
})
export class QuestionFormPageModule {}
