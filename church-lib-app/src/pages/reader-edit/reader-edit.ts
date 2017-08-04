import { ReaderService } from './../../providers/reader.service';
import { Reader } from './../../models/reader';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reader-edit',
  templateUrl: 'reader-edit.html',
})
export class ReaderEdit {
  reader: Reader;
  isNewReader: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private readerService: ReaderService) {
    let reader = this.navParams.get('reader');

    if(typeof(reader) !== 'undefined' && reader != null){
      this.reader = reader;
      this.isNewReader = false;
    }
    else{
      this.reader = new Reader(0, '', '', '', '', null);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReaderEdit');
  }

  onSubmit(){
    if(this.isNewReader){
      this.readerService.addReader(this.reader)
        .then( () => { console.log("reader was successfully added!")});
    }
    else{
      this.readerService.updateReader(this.reader)
        .then( () => { console.log("reader was successfully added!")});
    }
  }

}
