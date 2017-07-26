import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Book } from "../../../models/book";
import { BookService } from "../../../providers/book.service";

/**
 * Generated class for the BookEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-book-edit',
  templateUrl: 'book-edit.html',
})
export class BookEdit {
  book: Book;
  isNewBook: boolean = true;
  //@ViewChild('bookForm') bookForm: NgForm;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, public bookService: BookService) {
    let book = this.navParams.get('book');
    
    if(typeof(book) !== 'undefined' && book !== null){ 
      this.book = book;
      this.isNewBook = false;
    }else{
      this.book = new Book(0, '', '', null, null, '', '',null);
    }
  }

  ionViewDidLoad() {
    
  }

  onSubmit(){
    if(this.isNewBook){
      this.bookService.addBook(this.book)
        .then( () => { console.log("book was successfully added!")});
    }
    else{
      this.bookService.updateBook(this.book)
        .then( () => { console.log("book was successfully updated!")});
    }
    
  }

}
