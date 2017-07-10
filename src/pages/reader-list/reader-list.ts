import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReaderService } from "../../providers/reader-service";
import { Reader } from "./reader";
import { ReaderDetail } from "./reader-detail/reader-detail";
import { ReaderEdit } from "./reader-edit/reader-edit";

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

}
