import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Reader } from "../reader";
import { ReaderService } from "../../../providers/reader-service";
import { ReaderList } from "../reader-list";
import { ReaderEdit } from "../reader-edit/reader-edit";

/**
 * Generated class for the ReaderDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reader-detail',
  templateUrl: 'reader-detail.html',
})
export class ReaderDetail {
  reader: Reader;
  readerImg: string = "img/user.png";
  
  constructor(public navCtrl: NavController, private readerService: ReaderService,
   private alertCtrl: AlertController, public navParams: NavParams) {
     this.reader = navParams.get('reader');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReaderDetail');

  }

  onEdit(){
    this.navCtrl.push(ReaderEdit, {reader: this.reader});
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
    this.readerService.deleteReader(this.reader)
      .then( () => {
        console.log('Book successfully deleted');
        this.navCtrl.push(ReaderList);
      })
  }

}
