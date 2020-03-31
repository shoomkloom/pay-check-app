import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerApiService } from '../../services/server-api.service';
import { AlertService } from '../../services/alert.service';
import { AppError } from '../../app-error';
import { Helpers } from '../helpers';

@Component({
  selector: 'cm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService,
    private helpers: Helpers
  ) { }

  ngOnInit(): void {
    this.alertService.clear();    
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required && Validators.email],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.serverApi.userRegister(this.registerForm.value)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.helpers.setCurrentUser(JSON.stringify(data));
          this.router.navigate(['/login']);
        },
        (error: AppError) => {
          if(error.status === 404){
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
