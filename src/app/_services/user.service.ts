import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
  
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    register(user) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
  update(user) {
        return this.http.post(`${environment.apiUrl}/users/update`, user);
    }
}

/*export class workItemService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/workitem`);
    }

    register(workitem) {
        return this.http.post(`${environment.apiUrl}/workitem/register`, workitem);
    }
    delete(id) {
        return this.http.delete(`${environment.apiUrl}/workitem/${id}`);
    }
  update(workitem) {
        return this.http.post(`${environment.apiUrl}/workitem/update`, workitem);
    }
}*/
