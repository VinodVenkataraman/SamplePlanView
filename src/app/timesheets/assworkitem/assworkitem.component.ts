import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkTypeService, AlertService, AuthenticationService, UserService  } from '../../_services';
import { first } from 'rxjs/operators';
import { WorkItemService } from 'src/app/_services/workitem.service';

@Component({
  selector: 'app-timesheets',
  templateUrl : 'assworkitem.component.html'
})
export class AssWorkitemComponent implements OnInit {
  createWorkItem: FormGroup;
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
        private workTypeService: WorkTypeService,
        private workItemService: WorkItemService
  ) {
this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
       this.loadAllUsers();
      this.loadAllWorkType();
      this.loadAllWorkItems();
  this.createWorkItem = this.formBuilder.group({
    workItemCode: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    workItemDesc: ['', Validators.required],
    wItWorkTypeCode: ['', Validators.required]
  });

  }
  get wit() { return this.createWorkItem.controls; }
onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.createWorkItem.invalid) {
            return;
        }

        this.loading = true;
        this.workItemService.register(this.createWorkItem.value)
            .pipe(first())
            .subscribe(
                data => {
                this.alertService.success('Work Item Creation successful', true);
                 this.router.navigate(['/timesheets/worktype'], { queryParams: { registered: true }});
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


