import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { File as Model } from '../model/file';
import { FileService } from '../service/file.service';
import { ImageService } from '../service/image.service';

export interface FileDialogData {
    file: Model;
    callback: (Model) => void;
}

@Component({
    selector: 'app-file-dialog',
    templateUrl: './file-dialog.component.html',
    styleUrls: ['./file-dialog.component.scss']
})
export class FileDialogComponent {
    images = [];
    file: File;
    uploading = false;

    constructor(
        private dialogRef: MatDialogRef<FileDialogComponent>,
        private rest: FileService,
        private imageRest: ImageService,
        @Inject(MAT_DIALOG_DATA) public data: FileDialogData,
        private clipboardService: ClipboardService
    ) {
        if (this.data.file.id) {
            this.imageRest.fetchImagesByFileId(this.data.file.id).subscribe(images => {
                images.forEach(image => image.file = this.data.file);
                this.images = images;
            });
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

    save() {
        this.rest.saveFile(this.data.file).subscribe(file => {
            this.data.callback(file);
            this.dialogRef.close();
        });
    }

    dropFile(event) {
        console.log(event);
    }

    uploadEvent(file: File): void {
        if (this.file) {
            const formData: FormData = new FormData();
            formData.append('multiparts', file, file.name);
            this.uploading = true;
            this.rest.addImageToFile(this.data.file, formData)
                .subscribe((images) => {
                    images[0].file = this.data.file;
                    this.images.push(images[0]);
                    this.uploading = false;
                });
        }
    }

    deleteImage(image) {
        this.imageRest.deleteImage(image).subscribe(() => {
            this.images = this.images.filter(img => img !== image);
        });
    }

    copy(content: string) {
        this.clipboardService.copyFromContent(content);
    }

    onDrop(event) {
        event.preventDefault();
        if (event.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (const item of event.dataTransfer.items) {
                // If dropped items aren't files, reject them
                if (item.kind === 'file') {
                    const file: File = item.getAsFile();
                    this.uploadEvent(file);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (const file of event.dataTransfer.files) {
                this.uploadEvent(file);
            }
        }
    }
    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }
}
