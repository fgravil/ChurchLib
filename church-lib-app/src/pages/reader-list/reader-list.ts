import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReaderDetail } from "../reader-detail/reader-detail";
import { ReaderEdit } from "../reader-edit/reader-edit";
import { Reader } from "../../models/reader";
import { ReaderService } from "../../providers/reader.service";

/**
 * Generated class for the ReaderList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reader-list',
  templateUrl: 'reader-list.html',
})
export class ReaderList {
  readers: Reader[];
  searchInput: string = '';
  queriedReaders: Reader[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
   public alertCtrl: AlertController, public readerService: ReaderService) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ReaderList');
    this.readerService.getReaders()
      .subscribe(readers => this.getReaderSuccess(readers), err => this.handleError(err));
  }

  getReaderSuccess(readers){
    this.readers = readers;
    this.queriedReaders = readers;
  }
  onSelectReader(reader){
      this.navCtrl.push(ReaderDetail, {reader: reader});
  }

  onAddReader(){
    this.navCtrl.push(ReaderEdit);
  }

  onSearch(): void{
    this.queriedReaders = this.readers.filter(function(reader){
      let readerFullName: string = `${reader.firstName} ${reader.lastName}`;
      return readerFullName.toLowerCase().includes(this.searchInput);
    }.bind(this));
    //console.log('querying');
  }
  
  onCancelSearch(): void{
    this.queriedReaders = this.readers.slice();
  }
  
  handleError(error: string): void{
    this.displayAlert("Error", "Could not get list of readers.");
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
  
  getReaderInitials(firstName: string, lastName: string ): string{
    return firstName.charAt(0) + lastName.charAt(0);
  }
}
