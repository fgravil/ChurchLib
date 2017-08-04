import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";

import { MyApp } from './app.component';

// Services
import { AuthService } from "../providers/auth.service";
import { BookService } from '../providers/book.service';
import { TransactionService } from "../providers/transaction.service";
import { ReaderService } from "../providers/reader.service";

// Pages
import { HomePage } from './../pages/home/home';
import { Signup } from './../pages/signup/signup';
import { Userpage } from './../pages/userpage/userpage';
import { BookList } from "./../pages/book-list/book-list";
import { BookDetail } from './../pages/book-detail/book-detail';
import { BookEdit } from "./../pages/book-edit/book-edit";
import { ReaderList } from "./../pages/reader-list/reader-list";
import { ReaderEdit } from "./../pages/reader-edit/reader-edit";
import { ReaderDetail } from "./../pages/reader-detail/reader-detail";
import { TransactionsList } from "./../pages/transactions-list/transactions-list";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Signup,
    Userpage,
    BookDetail,
    BookEdit,
    BookList,
    ReaderList,
    ReaderEdit,
    ReaderDetail,
    TransactionsList
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Signup,
    Userpage,
    BookList,
    BookDetail,
    ReaderList,
    BookEdit,
    ReaderEdit,
    ReaderDetail,
    TransactionsList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    BookService,
    ReaderService,
    TransactionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
