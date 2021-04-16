import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let wktypes = JSON.parse(localStorage.getItem('worktype')) || [];
let wkitems = JSON.parse(localStorage.getItem('workitem')) || [];
let asswkitems = JSON.parse(localStorage.getItem('assworkitem')) || [];
let timesheets = JSON.parse(localStorage.getItem('timesheets')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
               case url.endsWith('/users/register') && method === 'POST':
                return register();
              case url.endsWith('/users/update') && method === 'POST':
                    return updateUser();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                return deleteUser();
                case url.endsWith('/worktype/register') && method === 'POST':
                return registerWorktype();
              case url.endsWith('/workitem/register') && method === 'POST':
                return registerWorkitem();
              case url.endsWith('/worktype') && method === 'GET':
                return getWorkTypes();
              case url.endsWith('/workitem') && method === 'GET':
                return getWorkItems();
              case url.endsWith('/assworkitem') && method === 'GET':
                return getAssWorkItems();
                case url.endsWith('/assworkitem/register') && method === 'POST':
                return registerWorkItemUser();
              case url.endsWith('/timesheet/register') && method === 'POST':
                return registerTimesheets();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
              lastName: user.lastName,
                usertype: user.usertype,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }
      function updateUser() {
        if (!isLoggedIn()) return unauthorized();
        const user = body
        //let index = users.find(x => x.id).id;
        if (users.find(x => x.username === user.username)) {
          users[user.id] = user;
          localStorage.setItem('users', JSON.stringify(users));
        }
        return ok();
      }
      function getWorkTypes() {
            return ok(wktypes);
      }
      function getWorkItems() {
            return ok(wkitems);
      }
      function getAssWorkItems() {
            return ok(asswkitems);
        }
      // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
      function registerWorktype() {
            const wktype = body

            if (wktypes.find(x => x.workTypeCode === wktype.workTypeCode)) {
                return error('Work Type Code "' + wktype.workTypeCode + '" is already present')
            }

            wktype.id = wktypes.length ? Math.max(...wktypes.map(x => x.id)) + 1 : 1;
            wktypes.push(wktype);
            localStorage.setItem('worktype', JSON.stringify(wktypes));
            return ok();
      }
      function registerWorkitem() {
            const wkitem = body
            if (wktypes.find(x => x.workItemCode === wkitem.workItemCode)) {
                return error('Work Item Code "' + wkitem.workItemCode + '" is already present')
            }
            wkitem.id = wkitems.length ? Math.max(...wkitems.map(x => x.id)) + 1 : 1;
            wkitems.push(wkitem);
            localStorage.setItem('workitem', JSON.stringify(wkitems));
            return ok();
      }
      function registerWorkItemUser() {
            const asswkitem = body
        if (asswkitems.find(x => x.assWitUserName === asswkitem.assWitUserName && x.assWitWorkDesc === asswkitem.assWitWorkDesc)) {
                 return error('Selected Work Item  for "' + asswkitem.assWitUserName + '" is assigned already')
            }
            asswkitem.id = asswkitems.length ? Math.max(...asswkitems.map(x => x.id)) + 1 : 1;
            asswkitems.push(asswkitem);
            localStorage.setItem('assworkitem', JSON.stringify(asswkitems));
            return ok();
      }
      function registerTimesheets() {
            const timesheet = body
        if (timesheets.find(x => x.subTimUser === timesheet.subTimUser && x.subTimDate === timesheet.subTimDate && x.subTimWorkItem === timesheet.subTimWorkItem )) {
                 return error('Time Sheet already submitted for the given period for "' + timesheet.subTimUser)
            }
            timesheets.id = timesheets.length ? Math.max(...timesheet.map(x => x.id)) + 1 : 1;
            timesheets.push(timesheet);
           localStorage.setItem('timesheets', JSON.stringify(timesheets));
            return ok();
      }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
