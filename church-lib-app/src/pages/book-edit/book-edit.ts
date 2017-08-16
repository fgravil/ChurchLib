import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../models/book";
import { BookService } from "../../providers/book.service";

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
  private book: Book;
  isNewBook: boolean = true;
  bookForm: FormGroup;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
  public navParams: NavParams, public bookService: BookService, public fb: FormBuilder) {
    this.initializeBook();
    this.createForm();
  }

  ionViewDidLoad() {
    
  }

  initializeBook(): void{
    let book = this.navParams.get('book');
    
    if(typeof(book) !== 'undefined' && book !== null){ 
      this.book = book;
      this.isNewBook = false;
    }else{
      this.book = new Book(0, '', '', null, null, '', '',null);
    }
  }

  createForm(): void{
    this.bookForm = this.fb.group({
      title: [this.book.title, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80)
      ])],
      author: [this.book.author, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ])],
      //TODO: change to list
      year: [this.book.year, Validators.compose([
        Validators.required,
        Validators.pattern('^[12][0-9]{3}$')
      ])],
      isbn: [this.book.isbn, Validators.compose([
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13)
      ])],
      description: [ this.book.description, Validators.compose([
        Validators.maxLength(300)
      ])]
    });
  }

  updateBookFromForm(){
    this.book.title = this.bookForm.get('title').value;
    this.book.author = this.bookForm.get('author').value;
    this.book.year = this.bookForm.get('year').value;
    this.book.isbn = this.bookForm.get('isbn').value;
    this.book.description = this.bookForm.get('description').value;
  }
  
  onSubmit(): void{
    this.updateBookFromForm();
    this.isNewBook ? this.addBook(): this.updateBook();
  }

  addBook(): void{
    this.bookService.addBook(this.book)
        .subscribe( book => this.onAddBookSuccess(book), err => this.handleError(err));
  }

  onAddBookSuccess(book: Book): void{
    this.navCtrl.pop();
  }
  
  updateBook(): void{
    this.bookService.updateBook(this.book)
      .subscribe( book => this.onUpdateBookSuccess(book), err => this.handleError(err));
  }

  onUpdateBookSuccess(book: Book): void{
    this.navCtrl.pop();
  }
  
  handleError(error: string): void{
    this.isNewBook ? this.displayAlert("Error", "Could not add new book") : this.displayAlert("Error", "Could not update book");
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
