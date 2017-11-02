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

  public pieChartLabels:string[] = ['Crédit', 'Débit'];
  public pieChartData:number[] = [0,0];
  public pieChartType:string = 'pie';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/transaction-list').subscribe(data => {
      let positive:number = 0;
      let negative:number = 0;
      let i:number = 0;
      while(data[i]) {
        this.transactions.push({value: data[i]['value'], message: data[i]['message'], date:data[i]['date']});
        i++;
      }
      this.updateChart();
    });
  }

  onSubmit() {
    console.log(this.nouvelleTransaction);
    this.transactions.push({value: this.nouvelleTransaction['value'], message: this.nouvelleTransaction['message'], date:new Date()});
    this.updateChart();
    this.http.post('/api/transaction', { value: this.nouvelleTransaction['value'], message: this.nouvelleTransaction['message']})
    .subscribe(data => {
      console.log(data);
    });
  }

  updateChart() {
    let positive:number = 0;
    let negative:number = 0;
    let i:number = 0;
    while(this.transactions[i]) {
      if(this.transactions[i].value > 0) {
        positive += +this.transactions[i]['value'];
      }
      else {
        negative += -this.transactions[i]['value'];
      }
      i++;
    }
    this.pieChartData = [positive, negative];
  }
}