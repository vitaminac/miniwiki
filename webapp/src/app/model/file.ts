import { Resource } from './resource';
import { Observable } from 'rxjs';

export class File extends Resource {
    id: number;
    title: string;
    description: string;
    unit: number;
    images: Observable<Resource[]>;

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            unit: this.unit
        };
    }
}
