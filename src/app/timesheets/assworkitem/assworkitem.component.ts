import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkTypeService, AlertService, AuthenticationService, UserService  } from '../../_services';
import { first } from 'rxjs/operators';
import { WorkItemService } from 'src/app/_services/workitem.service';
import { AssignService } from 'src/app/_services/assign.service';

@Component({
  selector: 'app-timesheets',
  templateUrl : 'assworkitem.component.html'
})
export class AssWorkitemComponent implements OnInit {
  assWorkItem: FormGroup;
  loading = false;
  submitted = false;
  currentUser: any;

  users = [];
  worktypeCodes = [];
  workitemCodes = [];
  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
      private assignService: AssignService,
        private workTypeService: WorkTypeService,
        private workItemService: WorkItemService
  ) {
this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
       this.loadAllUsers();
      this.loadAllWorkType();
      this.loadAllWorkItems();
  this.assWorkItem = this.formBuilder.group({
    assWitUserName: ['', Validators.required],
    assWitWorkDesc: ['', Validators.required]
    });

  }
  get asswit() { return this.assWorkItem.controls; }
onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.assWorkItem.invalid) {
            return;
        }

        this.loading = true;
        this.assignService.registerWit(this.assWorkItem.value)
            .pipe(first())
            .subscribe(
                data => {
                this.alertService.success('Assign Work Item successful', true);
                 this.router.navigate(['/timesheets'], { queryParams: { registered: true }});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
  }
        private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
  private loadAllWorkType() {
        this.workTypeService.getAll()
            .pipe(first())
            .subscribe(worktypeCodes => this.worktypeCodes = worktypeCodes);
  }
  private loadAllWorkItems() {
        this.workItemService.getAll()
            .pipe(first())
            .subscribe(workitemCodes => this.workitemCodes = workitemCodes);
  }
}


