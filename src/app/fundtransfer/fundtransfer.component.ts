import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.component.html',
  styleUrls: ['./fundtransfer.component.css']
})
export class FundtransferComponent implements OnInit {
  data3: any;
  data4: any;
  fundTransfer: any;
  options: any;
  transfer: any;
  selectedToAccount: any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit() {
    this.transfer = this.formBuilder.group({
      toAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.http.get('http://10.117.189.233:9900/modelbank/api/accounts').subscribe((response) => {
      console.log(response)
      if (response) {
        this.data3 = response; debugger;
        this.fundTransfer = response;
        console.log(response);

      }

    });
  }
  goto() {
    let data = {
      "fromAccount": sessionStorage.getItem("accountNumber"),
      "toAccount":(this.transfer.value.toAccount),
      "amount": this.transfer.value.amount
    };
    
  
    this.http.post('http://10.117.189.233:9900/modelbank/api/fundTransfer',data ).subscribe((response) => {
      if (response) {

        console.log(response);
        alert(response['message']);
        this.route.navigate(['/accsummary']);

      }

    });
  }
}
