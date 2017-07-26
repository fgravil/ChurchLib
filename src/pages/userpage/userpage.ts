import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthService } from "../../providers/auth.service";

/**
 * Generated class for the Userpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html',
})
export class Userpage {
  constructor(public navCtrl: NavController, public authservice: AuthService, public alertCtrl: AlertController) {}
  
  logout() {
        this.authservice.logout();
        this.navCtrl.setRoot(HomePage);
    }
    
 getinfo() {
           
    
  }         

  ionViewDidLoad() {
    console.log('ionViewDidLoad Userpage');
  }

}
