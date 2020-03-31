import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { ServerApiService } from '../../services/server-api.service';
import { AppError } from '../../app-error';

@Component({
  selector: 'cm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.clear();    
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required && Validators.email],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.serverApi.authGetValidUser(this.loginForm.value)
      .subscribe(
        validUser => {
          this.router.navigate(['/']);
        },
        (error: AppError) => {
          if(error.status === 400){
            this.alertService.error('Invalid username or password!');
          }
          else if(error.status === 404){
            this.alertService.error('Error 404!');
          }
          else{
            this.alertService.error('There was an unexpected error, please try again.');
          }
          this.loading = false;
        }
      )
  }
}
