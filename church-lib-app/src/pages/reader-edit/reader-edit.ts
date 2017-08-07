import { ReaderList } from './../reader-list/reader-list';
import { ReaderService } from './../../providers/reader.service';
import { Reader } from './../../models/reader';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-reader-edit',
  templateUrl: 'reader-edit.html',
})
export class ReaderEdit {
  private reader: Reader;
  readerForm: FormGroup;
  isNewReader: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private readerService: ReaderService, private fb: FormBuilder) {
    this.initializeReader();
    this.createForm();
  }
  
  initializeReader(): void{
    let reader = this.navParams.get('reader');
    if(typeof(reader) !== 'undefined' && reader != null){
      this.reader = reader;
      this.isNewReader = false;
    }
    else{
      this.reader = new Reader(0, '', '', '', '', null);
    }
  }
  createForm(): void{
    this.readerForm = this.fb.group({
      firstName: [ this.reader.firstName, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ])],
      lastName: [ this.reader.lastName, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ])],
      email: [this.reader.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      phone: [this.reader.phone, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('/[0-9]/')
      ])]
    })
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
      this.navCtrl.push(ReaderList);  
  }

}
