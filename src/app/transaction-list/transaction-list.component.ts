import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions = [];
  nouvelleTransaction = {};
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/transaction-list').subscribe(data => {
      let i = 0;
      while(data[i]) {
        this.transactions.push({value: data[i]['value'], message: data[i]['message'], date:data[i]['date']});
        i++;
      }
    });
  }

  onSubmit() {
    console.log(this.nouvelleTransaction);
    this.transactions.push({value: this.nouvelleTransaction['value'], message: this.nouvelleTransaction['message'], date:new Date()});
    this.http.post('/api/transaction', { value: this.nouvelleTransaction['value'], message: this.nouvelleTransaction['message']})
    //Promise
    .subscribe(data => {
      console.log(data);
    });
  }
}