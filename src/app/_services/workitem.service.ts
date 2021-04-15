import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })

export class WorkItemService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/workitem`);
    }

    register(workitem) {
        return this.http.post(`${environment.apiUrl}/workitem/register`, workitem);
    }
   /* delete(id) {
        return this.http.delete(`${environment.apiUrl}/worktype/${id}`);
    }
  update(worktype) {
        return this.http.post(`${environment.apiUrl}/worktype/update`, worktype);
    }*/
}
