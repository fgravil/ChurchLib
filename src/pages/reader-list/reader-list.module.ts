import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReaderList } from './reader-list';

@NgModule({
  declarations: [
    ReaderList,
  ],
  imports: [
    IonicPageModule.forChild(ReaderList),
  ],
  exports: [
    ReaderList
  ]
})
export class ReaderListModule {}
