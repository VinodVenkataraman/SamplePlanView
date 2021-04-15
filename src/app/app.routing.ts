import { UsersComponent } from './users/users.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { AuthGuard } from './_helpers';
import { WorktypeComponent } from './timesheets/worktype/worktype.component';
import { WorkitemComponent } from './timesheets/workitem/workitem.component';
import { AssWorkitemComponent } from './timesheets/assworkitem/assworkitem.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'timesheets', component: TimesheetsComponent },
  { path: 'timesheets/worktype', component: WorktypeComponent },
  { path: 'timesheets/workitem', component: WorkitemComponent },
  { path: 'timesheets/assworkitem', component: AssWorkitemComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
