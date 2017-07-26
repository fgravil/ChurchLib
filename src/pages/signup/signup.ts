import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Credentials } from "./Credentials";
import { AuthService } from "../../providers/auth.service";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  newcreds: Credentials = new Credentials("", "", "");

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: AuthService, public alertCtrl: AlertController) {
  }

  register(user){
    this.authService.addUser(user).then(data => {
      if(data){
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'User Created',
          buttons: ['ok']
        });
        alert.present();
      }
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
