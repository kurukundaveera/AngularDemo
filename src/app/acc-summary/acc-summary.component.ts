import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acc-summary',
  templateUrl: './acc-summary.component.html',
  styleUrls: ['./acc-summary.component.css']
})
export class AccSummaryComponent implements OnInit {
  data2: any;
  data3: any;
  accountHistory: any;
  accountSummary: Object;
  loginId: any;
  accountNumber: number;
  url: any;
  currUserAccount: any;
  accountId: any;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    
    this.currUserAccount = sessionStorage.getItem("accountNumber");
    this.url = `http://10.117.189.233:9900/modelbank/api/accountSummary/${this.currUserAccount}`;
    this.http.get(this.url).subscribe((response) => {
      if (response) {
        this.data3 = response; debugger;
        this.accountSummary = response;
        sessionStorage.setItem('accountId', response['accountId'])
        console.log(response);
        this.getBooks();
      }
    });

  }
  getBooks() {
    this.accountId = sessionStorage.getItem("accountId");
    this.http.get(`http://10.117.189.233:9900/modelbank/api/transactions/${this.accountId}`).subscribe((response) => {
      if (response) {
        this.data2 = response; debugger;
        this.accountHistory = response;
        console.log(response);
      }
    });
  }
  goto() {
    this.route.navigate(['/fundtransfer']);
  }
}

