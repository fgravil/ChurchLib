import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookEdit } from './book-edit';

@NgModule({
  declarations: [
    BookEdit,
  ],
  imports: [
    IonicPageModule.forChild(BookEdit),
  ],
  exports: [
    BookEdit
  ]
})
export class BookEditModule {}
