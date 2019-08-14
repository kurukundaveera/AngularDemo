import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { AlertService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    accountNumber: any;
    returnUrl: string;
    data1: any;
    loginId: any;
    password: any;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: Router,
        // private authenticationService: AuthenticationService,
        // private alertService: AlertService
        private http: HttpClient
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            loginId: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    goto() {
        this.route.navigate(['/accsummary']);

    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log("in submit")
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        //   this.loginForm.value(this.loginForm.value)
        //      .pipe(first())
        //       .subscribe(
        //        data => {

        //           this.loginForm.value('Registration successful', true);
        //               this.route.navigate(['/accsummary']);
        //           },
        //           error => {
        //             //   this.alertService.error(error);
        //               this.loading = false;
        //           });

        console.log(this.loginForm);
        var reqObj1 = {
            "loginId": this.loginForm.value.firstName,
            "password": this.loginForm.value.password
        };

        // return this.http.put("http://10.117.189.233:9900/modelbank/api/login", this.loginForm.value).subscribe((response)=>{
        //     console.log(response); debugger;
        //     this.route.navigate(['/accsummary']);
        //    // localStorage.setItem("accountNo", response.);
        //  }); 
        //   console.log(this.loginForm);
        this.http
            .put("http://10.117.189.233:9900/modelbank/api/login", this.loginForm.value)
            .subscribe((res: Response) => {
                console.log(res);
                alert(res['message'])
                sessionStorage.setItem("accountNumber", res['accountNumber']);
                this.route.navigate(['/accsummary']);

            }, (err) => {
                console.log(err)
                alert(err.message);
            });

    }
}
