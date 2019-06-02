import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary } from '../model/itinerary';

@Injectable({
    providedIn: 'root'
})
export class ItineraryService {

    constructor(private http: HttpClient) {
    }
    
    saveItinerary(itinerary): Observable<Itinerary> {
        itinerary.unit = itinerary.unit._links.self.href;
        return this.http.post<Itinerary>('/api/itineraries', itinerary);
    }

    deleteItinerary(itinerary: Itinerary) {
        return this.http.delete('/api/itineraries/' + itinerary.id);
    }
}
