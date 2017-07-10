import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetail } from './book-detail';

@NgModule({
  declarations: [
    BookDetail,
  ],
  imports: [
    IonicPageModule.forChild(BookDetail),
  ],
  exports: [
    BookDetail
  ]
})
export class BookDetailModule {}
