import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BookList } from "../book-list/book-list";
import { BookEdit } from "../book-edit/book-edit";
import { Book } from "../../models/book";
import { BookService } from "../../providers/book.service";

/**
 * Generated class for the BookDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetail {
  book : Book;
  bookImg : string = "img/no-book.jpg";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bookService: BookService, private alertCtrl: AlertController) {
    this.loadBook();
  }

  ionViewDidLoad() {
    console.log(this.book); 
  }

  loadBook(){
    this.book = this.navParams.get('book');
  }

  onDelete(){
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you wan to delete this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => this.onConfirmDelete()
        }
      ]
    });
    alert.present();
  }

  onConfirmDelete(){
    this.bookService.deleteBook(this.book)
      .then( () => {
        console.log('Book successfully deleted');
        this.navCtrl.push(BookList);
      })
  }

  onEdit(){
    this.navCtrl.push(BookEdit, {book: this.book});
  }

  dismiss(){
    this.navCtrl.pop();
  }

}
