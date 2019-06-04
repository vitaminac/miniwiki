import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(private http: HttpClient) {
    }

    fetchImagesByFileId(id: number): Observable<{ file }[]> {
        return this.http.get<[]>('/api/forms/' + id + '/images');
    }

    deleteImage(image) {
        return this.http.delete('/api/images/' + image.file.id + '_' + image.id.filename);
    }
}
