import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  input: string = '';
  queriedReaders: Reader[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public readerService: ReaderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReaderList');
    this.getReaders();
  }

  onSelectReader(reader){
      this.navCtrl.push(ReaderDetail, {reader: reader});
  }

  onAddReader(){
    this.navCtrl.push(ReaderEdit);
  }

  getReaders(){
    this.readerService.getReaders().then(data => {
      if(data){
        this.readers = <Reader[]> data;
        this.queriedReaders = this.readers.slice();
        console.log(this.readers);
      }
    })
  }
  
  getReaderInitials(firstName: string, lastName: string ): string{
    return firstName.charAt(0) + lastName.charAt(0);
  }
}