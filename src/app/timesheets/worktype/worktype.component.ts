import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkTypeService, AlertService, AuthenticationService  } from '../../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-timesheets',
  templateUrl : 'worktype.component.html'
  /*template: `<nav class="navbar navbar-expand navbar-dark bg-dark">
   <div class="navbar-nav">
        <!--<a class="nav-item nav-link" routerLink="['/]">Home</a>-->
        <a class="nav-item nav-link" [routerLink]="['/worktype']">Create Work Type</a>
        <a class="nav-item nav-link" [routerLink]="['/workitem']">Create Work Item</a>
        <a class="nav-item nav-link" [routerLink]="['/workitem']">Create Work Item</a>
    </div>
</nav>`,*/
  //styleUrls: ['./timesheets.component.less']
})
export class WorktypeComponent implements OnInit {
  createWorkType: FormGroup;
  loading = false;
  submitted = false;
  worktypeCodes = [];
  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    private alertService: AlertService,
        private workTypeService: WorkTypeService
  ) {

  }

  ngOnInit() {
  this.createWorkType = this.formBuilder.group({
    workTypeCode: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
    workTypeDesc: ['', Validators.required]
  });

  }
  get wt() { return this.createWorkType.controls; }
onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.createWorkType.invalid) {
            return;
        }

        this.loading = true;
        this.workTypeService.register(this.createWorkType.value)
            .pipe(first())
            .subscribe(
                data => {
                this.alertService.success('Work Code Creation successful', true);
                this.router.navigate(['/timesheets'], { queryParams: { registered: true }});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}


