import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BookDetail } from "./book-detail/book-detail";
import { BookEdit } from "./book-edit/book-edit";
import { Book } from "../../models/book";
import { BookService } from "../../providers/book.service";

/**
 * Generated class for the BookList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookList {
  books: Book[];
  input: string = '';
  queriedBooks: Book[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public bookService: BookService, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.getBooks();
    //console.log(window.localStorage.getItem('token-expire-time'));
  }

  onSelectBook(book){
    this.navCtrl.push(BookDetail, {book: book});
    // let modal = this.modalCtrl.create(BookDetail, book);
    // modal.present();
    
  }

  onAddBook(){
    this.navCtrl.push(BookEdit);
  }

  getBooks(){
    this.bookService.getBooks().then(data => {
      if(data){
        this.books = <Book[]> data;
        this.queriedBooks = this.books.slice();
      }
    })
  }

  onSearch(){
    this.queriedBooks = this.books.filter((book) => book.title.includes(this.input));
    console.log('querying');
  }
  onCancelSearch(){
    this.queriedBooks = this.books.slice();
  }

}
