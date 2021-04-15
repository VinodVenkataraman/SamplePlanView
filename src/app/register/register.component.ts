import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService, AlertService } from '../_services';
import { DateValidate, MustMatch } from '../_helpers/custom.validators';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
  submitted = false;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

  ngOnInit() {
//let userTypeList: any = ['Admin', 'User'];
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          dob: ['', [Validators.required,DateValidate]],
          email: ['', [Validators.required, Validators.email]],
          add1: [''],
          add2: [''],
          city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          state: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          zipcode: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
          username: ['', Validators.required],
          usertype: ['',Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
        },
       {
         validator: MustMatch('password', 'confirmPassword')
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
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
