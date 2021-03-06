import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService, WorkTypeService } from '../_services';
import { AssignService } from '../_services/assign.service';
import { WorkItemService } from '../_services/workitem.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: any;
  users = [];
  worktypeCodes = [];
  workitemCodes = [];
  assitems = [];
    constructor(
        private authenticationService: AuthenticationService,
      private userService: UserService,
      private workTypeService: WorkTypeService,
      private workItemService: WorkItemService,
         private assignService: AssignService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
      this.loadAllUsers();
      this.loadAllWorkType();
      this.loadAllWorkItems();
      this.loadAllAssItems();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
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
  private loadAllAssItems() {
        this.assignService.getAll()
            .pipe(first())
            .subscribe(assitems => this.assitems = assitems);
    }
}
