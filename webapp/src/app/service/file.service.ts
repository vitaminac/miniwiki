import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../model/content';
import { File } from '../model/file';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) {
    }

    fetchFilesOfPageByUnitId(id: number, page: number): Observable<Content<File[]>> {
        return this.http.get<Content<File[]>>('/api/units/' + id + '/forms', {
            params: {
                page: page.toString()
            }
        });
    }

    saveFile(file: File): Observable<File> {
        return this.http.post<File>('/api/forms', file);
    }

    deleteFile(file: File) {
        return this.http.delete('/api/forms/' + file.id);
    }

    addImageToFile(file: File, image): Observable<any> {
        return this.http.post('/api/forms/' + file.id + '/images', image);
    }
}
