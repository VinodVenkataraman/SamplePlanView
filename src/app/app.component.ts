import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

@Component({
  selector: 'app', template: `
<nav class="navbar navbar-expand navbar-dark bg-dark" *ngIf="currentUser">
    <div class="navbar-nav">
        <a class="nav-item nav-link" routerLink="['/]">Home</a>
        <a class="nav-item nav-link" [routerLink]="['/users']">Users</a>
        <a class="nav-item nav-link" [routerLink]="['/timesheets']">TimeSheets</a>
        <a class="nav-item nav-link" (click)="logout()">Logout</a>
    </div>
</nav>

<!-- main content container -->
<div class="jumbotron">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2">
                <alert></alert>
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
</div>`
   })
export class AppComponent {
    currentUser: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
