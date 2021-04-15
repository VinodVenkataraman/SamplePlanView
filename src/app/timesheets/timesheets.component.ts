import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkTypeService, AlertService, AuthenticationService, UserService  } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-timesheets',
  templateUrl : 'timesheets.component.html',
  /*template: `<nav class="navbar navbar-expand navbar-dark bg-dark">
   <div class="navbar-nav">
        <!--<a class="nav-item nav-link" routerLink="['/]">Home</a>-->
        <a class="nav-item nav-link" [routerLink]="['/timesheets/worktype']">Create Work Type</a>
        <a class="nav-item nav-link" [routerLink]="['/timesheets/workitem']">Create Work Item</a>
        <a class="nav-item nav-link" [routerLink]="['/timesheets/assworkitem']">Assign Work Item</a>
    </div>
</nav>`,*/
  styleUrls: ['./timesheets.component.less']
})
export class TimesheetsComponent implements OnInit {
  createWorkType: FormGroup;
  loading = false;
  submitted = false;
  currentUser: any;

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    private authenticationService: AuthenticationService,
        private userService: UserService,
    private alertService: AlertService,
        private workTypeService: WorkTypeService
  ) {
this.currentUser = this.authenticationService.currentUserValue;
  }

ngOnInit() {
  this.createWorkType = this.formBuilder.group({
    workTypeCode: ['', Validators.required],
    workTypeDesc: ['', Validators.required]
  });
}
onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.createWorkType.invalid) {
            return;
        }

        this.loading = true;
       /* this.workTypeService.register(this.createWorkType.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Work Code Creation successful', true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    }
}


