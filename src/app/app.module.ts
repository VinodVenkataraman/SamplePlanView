import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { UsersComponent } from './users/users.component';
import { WorktypeComponent } from './timesheets/worktype/worktype.component';
import { WorkitemComponent } from './timesheets/workitem/workitem.component';
import { AssWorkitemComponent } from './timesheets/assworkitem/assworkitem.component';


@NgModule({
    imports: [
    BrowserModule,
      FormsModule,
        ReactiveFormsModule,
    HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
      TimesheetsComponent,
      WorktypeComponent,
      WorkitemComponent,
      AssWorkitemComponent,
        UsersComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
