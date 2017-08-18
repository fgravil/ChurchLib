import { ReaderDetail } from './../reader-detail/reader-detail';
import { ReaderService } from './../../providers/reader.service';
import { Reader } from './../../models/reader';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  private readerService: ReaderService, private fb: FormBuilder) {
    this.initializeReader();
    this.createForm();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReaderEdit');
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
        Validators.pattern(`(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?\\d{3}\\d{4}`)
      ])]
    })
  }
  
  private updateReaderFromForm(): void{
    this.reader.firstName = this.readerForm.get('firstName').value;
    this.reader.lastName = this.readerForm.get('lastName').value;
    this.reader.email = this.readerForm.get('email').value;
    this.reader.phone = this.readerForm.get('phone').value;
  }

  onSubmit(): void{
    this.updateReaderFromForm();
    this.isNewReader ? this.addNewReader() : this.updateReader();
  }

  addNewReader(): void{
    this.readerService.addReader(this.reader)
      .subscribe(reader => this.addNewReaderSuccess(reader), err => this.handleError(err));
    this.isNewReader = false;
  }
  
  addNewReaderSuccess(reader: Reader){
    this.reader = reader;
    this.navCtrl.pop();
    this.navCtrl.push(ReaderDetail, {'reader': this.reader});
  }

  updateReader(): void{
    this.readerService.updateReader(this.reader)
      .subscribe(() => this.updateReaderSuccess(), err => this.handleError(err));
  }

  updateReaderSuccess(){
    this.navCtrl.pop();
  }
  handleError(error: string): void{
    this.isNewReader ? this.displayAlert("Error", "Could not add new reader") : this.displayAlert("Error", "Could not update reader");
    console.log(error);
  }

  displayAlert(message: string, details?: string): void{
    let alert = this.alertCtrl.create({
      title: message,
      subTitle: details,
      buttons: ['OK']
    });
    alert.present();
  }

}
