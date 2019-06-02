import { Resource } from './resource';
import { Itinerary } from './itinerary';

export class Unit extends Resource {
    id: number;
    title: string;
    itineraries: Itinerary[];
}
