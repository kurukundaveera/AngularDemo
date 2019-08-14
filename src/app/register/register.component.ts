import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  data: any;
  firstName: any;
  email: any;
  mobileNo: any;
  password: any;
  confirmPassword: any;
age: any;
pan: any;
lastName: any;
address: any;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route:Router,
    //   private authenticationService: AuthenticationService,
    //   private userService: UserService,
    //   private alertService: AlertService,
      private http:HttpClient
  ) { 
      // redirect to home if already logged in
    //   if (this.authenticationService.currentUserValue) { 
    //       this.router.navigate(['/']);
    //   }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          mobileNo: ['', [Validators.required, Validators.minLength(10)]],
          age: [''],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
          address: [''],
          pan: ['', Validators.required]
          
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      console.log(this.registerForm);
      var reqObj = {
         "firstName": this.registerForm.value.firstName,
         "email": this.registerForm.value.email,
         "mobileNo" :this.registerForm.value.mobileNo,
         "password" : this.registerForm.value.password,
         "confirmPassword" : this.registerForm.value.confirmPassword,
         "age" : this.registerForm.value.age,
         "pan" : this.registerForm.value.pan,
         "lastName" : this.registerForm.value.lastName,
         "address" : this.registerForm.value.address
      };
    this.http.post('http://10.117.189.233:9900/modelbank/api/register', reqObj).subscribe((response) => {
        if (response) {
            this.data = response;
            alert(response['message'])
              this.firstName = this.data.firstName;
              this.email = this.data.email;
              this.mobileNo = this.data.mobileNo;
              this.password = this.data.password;
              this.confirmPassword = this.data.confirmPassword;
              this.age = this.data.age;
              this.pan = this.data.pan;
              this.lastName = this.data.lastName;
              this.address = this.data.address;
              this.route.navigate(['/login']);
        }
      
        console.log(this.registerForm);
        
        
    });
      //this.loading = true;
      
      // this.registerForm.value(this.registerForm.value)
      //    .pipe(first())
      //     .subscribe(
      //      data => {
                  
      //         //this.registerForm.value('Registration successful', true);
      //             this.route.navigate(['/login']);
      //         },
      //         error => {
      //           //   this.alertService.error(error);
      //             this.loading = false;
      //         });
  }
  
}
