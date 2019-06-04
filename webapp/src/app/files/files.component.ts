import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { File } from '../model/file';
import { AuthenticationService } from '../service/authentication.service';
import { FileService } from '../service/file.service';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
    unit: number;
    page = 0;
    files: File[] = [];
    loading = false;
    total = 1;

    constructor(
        private rest: FileService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private auth: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            this.unit = Number(params.id);
            this.loadMore();
        });
    }

    deleteFile(file: File) {
        this.rest.deleteFile(file).subscribe(() => {
            this.files = this.files.filter(f => f.id !== file.id);
        });
    }

    createFile(): void {
        const newFile = { unit: this.unit };
        const dialogRef = this.dialog.open(FileDialogComponent, {
            data: {
                file: newFile,
                callback: file => {
                    file.unit = this.unit;
                    this.files.push(file);
                }
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    loadMore() {
        if (!this.loading) {
            if (this.page < this.total) {
                this.loading = true;
                this.rest.fetchFilesOfPageByUnitId(this.unit, this.page++).subscribe(data => {
                    this.total = data.totalPages;
                    this.files = this.files.concat(data.content);
                    this.loading = false;
                });
            }
        }
    }

    get isAdmin() {
        return this.auth.isAdmin;
    }
}
