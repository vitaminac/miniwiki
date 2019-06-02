import { Component, OnInit } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { Itinerary } from '../model/itinerary';
import { Unit } from '../model/unit';
import { AuthenticationService } from '../service/authentication.service';
import { UnitService } from '../service/unit.service';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
    searchInputTerm: string;
    itinerary: Itinerary;
    page = 0;
    total = 1;
    loading = false;
    private units: Unit[] = [];

    constructor(
        private rest: UnitService,
        private auth: AuthenticationService,
        private dialogService: TdDialogService
    ) {
    }

    ngOnInit(): void {
        this.loadMore();
    }

    onBlurEvent() {

    }

    createUnit(): void {
        this.dialogService.openPrompt({
            message: 'Introduzca el título',
            title: 'Añadir Nueva Unidad',
            cancelButton: 'Cancelar',
            acceptButton: 'Crear'
        }).afterClosed().subscribe((title: string) => {
            if (title) {
                this.rest.saveUnit(title).subscribe(unit => this.units.push(unit));
            }
        });
    }

    deleteUnit(unit: Unit) {
        this.rest.deleteUnit(unit).subscribe(() => this.units = this.units.filter(e => e.id !== unit.id));
    }

    get isAdmin() {
        return this.auth.isAdmin;
    }

    loadMore() {
        if (!this.loading) {
            if (this.page < this.total) {
                this.loading = true;
                this.rest.fetchUnitsOfPage(this.page++).subscribe(data => {
                    this.total = data.page.totalPages;
                    this.units = this.units.concat(data._embedded.units);
                    this.loading = false;
                });
            }
        }
    }
}
