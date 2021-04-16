import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkTypeService, AlertService, AuthenticationService, UserService  } from '../_services';
import { first } from 'rxjs/operators';
import { AssignService } from '../_services/assign.service';
import { DateValidate } from '../_helpers/custom.validators';
import { TimesheetService } from '../_services/timesheet.service';

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
  submitTimeSheet: FormGroup;
  loading = false;
  submitted = false;
  currentUser: any;
assitems = [];
  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    private authenticationService: AuthenticationService,
        private userService: UserService,
    private alertService: AlertService,
    private timesheetService: TimesheetService,
            private assignService: AssignService
  ) {
this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  this.loadAllAssItems();
    this.submitTimeSheet = this.formBuilder.group({
      subTimUser:[''],
     subTimDate: ['', [Validators.required,DateValidate]],
    subTimWorkItem: ['', Validators.required],
    hours: ['', [Validators.required,Validators.maxLength(1),Validators.pattern('[0-9 ]*')]]
  });
  }
  get subTim() { return this.submitTimeSheet.controls; }
onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.submitTimeSheet.invalid) {
            return;
        }
  this.submitTimeSheet.value.subTimUser = this.currentUser.username;
          this.loading = true;
       this.timesheetService.register(this.submitTimeSheet.value)
            .pipe(first())
            .subscribe(
                data => {
                this.alertService.success('Time Sheet Submission successful', true);
                this.loading = false;
                this.router.navigate(['/timesheets'], { queryParams: { registered: true }});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
}
  private loadAllAssItems() {
        this.assignService.getAll()
            .pipe(first())
            .subscribe(assitems => this.assitems = assitems);
    }
}


