import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })

export class WorkTypeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/worktype`);
    }

    register(worktype) {
        return this.http.post(`${environment.apiUrl}/worktype/register`, worktype);
    }
   /* delete(id) {
        return this.http.delete(`${environment.apiUrl}/worktype/${id}`);
    }
  update(worktype) {
        return this.http.post(`${environment.apiUrl}/worktype/update`, worktype);
    }*/
}
