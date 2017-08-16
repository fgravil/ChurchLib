import { BookService } from './../../providers/book.service';
import { Book } from './../../models/book';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { BookDetail } from "./../book-detail/book-detail";
import { BookEdit } from "./../book-edit/book-edit";


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

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController,
  private bookService: BookService, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.bookService.getBooks()
      .subscribe(books => this.getBookSuccess(books), err => this.handleError(err));
  }

  getBookSuccess(books: Book[]):void{
    this.books = books;
    this.queriedBooks = books;
  }
  
  onSelectBook(book):void {
    this.navCtrl.push(BookDetail, {book: book});  
  }

  onAddBook(): void{
    this.navCtrl.push(BookEdit);
  }

  onSearch(): void{
    this.queriedBooks = this.books.filter((book) => book.title.toLowerCase().includes(this.input));
    console.log('querying');
  }
  
  onCancelSearch(): void{
    this.queriedBooks = this.books.slice();
  }
  
  handleError(error: string): void{
    this.displayAlert("Error", "Could not get list of books.");
    console.log(error);
  }

  displayAlert(message: string, details?: string): void{
    let alert = this.alertCtrl.create({
      title: message,
      subTitle: details,
      buttons: ['OK']
    });
    alert.present();
  }

}
