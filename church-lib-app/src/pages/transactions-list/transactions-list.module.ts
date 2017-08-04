import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsList } from './transactions-list';

@NgModule({
  declarations: [
    TransactionsList,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsList),
  ],
  exports: [
    TransactionsList
  ]
})
export class TransactionsListModule {}
