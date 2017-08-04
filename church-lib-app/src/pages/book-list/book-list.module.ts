import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookList } from './book-list';

@NgModule({
  declarations: [
    BookList,
  ],
  imports: [
    IonicPageModule.forChild(BookList),
  ],
  exports: [
    BookList
  ]
})
export class BookListModule {}
