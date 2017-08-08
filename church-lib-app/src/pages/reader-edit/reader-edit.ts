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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReaderEdit');
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
        Validators.pattern(`(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}`)
      ])]
    })
  }
  
  private updateReaderFromForm(){
    this.reader.firstName = this.readerForm.get('firstName').value;
    this.reader.lastName = this.readerForm.get('lastName').value;
    this.reader.email = this.readerForm.get('email').value;
    this.reader.phone = this.readerForm.get('phone').value;
  }

  onSubmit(){
    this.updateReaderFromForm();
    this.readerService.updateReader(this.reader);
    this.navCtrl.push(ReaderList);  
  }

  

}
