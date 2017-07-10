import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Signup } from '../pages/signup/signup';
import { Userpage } from '../pages/userpage/userpage';
import { AuthService } from "../providers/auth-service";
import { BookService } from '../providers/book-service';
import { BookList } from "../pages/book-list/book-list";
import { BookDetail } from "../pages/book-list/book-detail/book-detail";
import { BookEdit } from "../pages/book-list/book-edit/book-edit";
import { ReaderList } from "../pages/reader-list/reader-list";
import { ReaderService } from "../providers/reader-service";
import { FormsModule } from "@angular/forms";
import { ReaderEdit } from "../pages/reader-list/reader-edit/reader-edit";
import { ReaderDetail } from "../pages/reader-list/reader-detail/reader-detail";

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
    ReaderDetail
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
    ReaderDetail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    BookService,
    ReaderService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
