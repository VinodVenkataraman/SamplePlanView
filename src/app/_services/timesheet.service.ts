import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })

export class TimesheetService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/timesheet`);
    }

    register(timesheet) {
        return this.http.post(`${environment.apiUrl}/timesheet/register`, timesheet);
    }
   /* delete(id) {
        return this.http.delete(`${environment.apiUrl}/timesheet/${id}`);
    }
  update(worktype) {
        return this.http.post(`${environment.apiUrl}/worktype/update`, worktype);
    }*/
}
