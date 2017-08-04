import { BookList } from './../book-list/book-list';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
    //import { Userpage } from "../userpage/userpage";
import { Signup } from "../signup/signup";
import { AuthService } from "../../providers/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  user = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public authservice: AuthService) {

  }

  ngOnInit(){
    console.log(window.localStorage.getItem('token-expire-time'));
    if(this.authservice.isLoggedIn() ){
      this.navCtrl.setRoot(BookList);
    }
  }
  
  login(user){
    this.authservice.authenticate(user).then(data => {
      if(data){
        this.navCtrl.setRoot(BookList);
      }
    })
  }

  signup(){
    this.navCtrl.push(Signup);
  }
}
