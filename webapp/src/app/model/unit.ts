import { Itinerary } from './itinerary';
import { Resource } from './resource';

export class Unit extends Resource {
    id: number;
    title: string;
    itineraries: Itinerary[];
}
