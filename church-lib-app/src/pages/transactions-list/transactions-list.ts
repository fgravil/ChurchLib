import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transaction } from "../../models/transaction";
import { TransactionService } from "../../providers/transaction.service";

/**
 * Generated class for the TransactionsList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transactions-list',
  templateUrl: 'transactions-list.html',
})
export class TransactionsList {
  private transactions: Transaction[];
  private 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private transactionService: TransactionService) {
  }

  ionViewDidLoad() {
    this.transactionService.getTransactions()
        .subscribe(
          transactions => this.transactions = transactions,
          err => this.handleError(err)
        );
  }

  // private onSelectTransaction(transaction: Transaction){
  //     //this.navCtrl.push(TransactionDetail, {transaction: transaction});
  // }
  
  private handleError(error?: string){
    console.log(error);
  }
  


}
