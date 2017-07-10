import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReaderDetail } from './reader-detail';

@NgModule({
  declarations: [
    ReaderDetail,
  ],
  imports: [
    IonicPageModule.forChild(ReaderDetail),
  ],
  exports: [
    ReaderDetail
  ]
})
export class ReaderDetailModule {}
