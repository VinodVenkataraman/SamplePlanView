import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })

export class AssignService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/assworkitem`);
    }

    registerWit(assworkitem) {
        return this.http.post(`${environment.apiUrl}/assworkitem/register`, assworkitem);
    }
}
