import { ReaderService } from './../../providers/reader.service';
import { Reader } from './../../models/reader';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReaderList } from "../reader-list/reader-list";
import { ReaderEdit } from "../reader-edit/reader-edit";

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
      .subscribe(() => this.onDeleteSuccess() ,err => this.handleError(err))
  }
  
  onDeleteSuccess(){
    this.navCtrl.pop();
  }
  handleError(error: string): void{
    this.displayAlert("Error", "Could not delete reader.");
    console.log(error);
  }

  displayAlert(message: string, details?: string){
    let alert = this.alertCtrl.create({
      title: message,
      subTitle: details,
      buttons: ['OK']
    });
    alert.present();
  }

}
