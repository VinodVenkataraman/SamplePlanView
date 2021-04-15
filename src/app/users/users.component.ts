import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'users.component.html' })
export class UsersComponent implements OnInit {
    currentUser: any;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
  updateUser(id: number) {
        this.userService.update(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}
