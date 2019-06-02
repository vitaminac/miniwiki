import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resources } from '../model/resources';
import { Itinerary } from '../model/itinerary';
import { Unit } from '../model/unit';

@Injectable({
    providedIn: 'root'
})
export class ItineraryService {

    constructor(private http: HttpClient) {
    }

    fetchItinerariesByUnit(unit: Unit): Observable<Resources<{ itineraries: Itinerary[] }>> {
        return this.http.get<Resources<{ itineraries: Itinerary[] }>>('/api/units/' + unit.id + '/itineraries');
    }

    saveItinerary(itinerary): Observable<Itinerary> {
        itinerary.unit = itinerary.unit._links.self.href;
        return this.http.post<Itinerary>('/api/itineraries', itinerary);
    }

    deleteItinerary(itinerary: Itinerary) {
        return this.http.delete('/api/itineraries/' + itinerary.id);
    }
}
