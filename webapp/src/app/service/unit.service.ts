import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../model/unit';
import { Observable } from 'rxjs';
import { Resources } from '../model/resources';

@Injectable({
    providedIn: 'root'
})
export class UnitService {

    constructor(private http: HttpClient) {
    }

    fetchUnitsOfPage(page: number): Observable<Resources<{ units: Unit[] }>> {
        return this.http.get<Resources<{ units: Unit[] }>>('/api/units', {
            params: {
                page: page.toString()
            }
        });
    }

    deleteUnit(unit: Unit) {
        return this.http.delete('/api/units/' + unit.id);
    }

    saveUnit(title: string): Observable<Unit> {
        return this.http.post<Unit>('/api/units', {
            title
        });
    }
}
