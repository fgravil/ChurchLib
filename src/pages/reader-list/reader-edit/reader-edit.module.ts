import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReaderEdit } from './reader-edit';

@NgModule({
  declarations: [
    ReaderEdit,
  ],
  imports: [
    IonicPageModule.forChild(ReaderEdit),
  ],
  exports: [
    ReaderEdit
  ]
})
export class ReaderEditModule {}
