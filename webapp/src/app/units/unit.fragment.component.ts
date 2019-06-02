import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { Itinerary } from '../model/itinerary';
import { Unit } from '../model/unit';
import { AuthenticationService } from '../service/authentication.service';
import { ItineraryService } from '../service/itinerary.service';

@Component({
    selector: 'app-unit-fragment',
    templateUrl: './unit.fragment.component.html',
    styleUrls: ['./unit.fragment.component.scss']
})
export class UnitsFragmentComponent implements OnInit {
    @Input()
    unit: Unit;
    itineraries: Itinerary[];

    @Output()
    delete: EventEmitter<any>;

    constructor(
        private rest: ItineraryService,
        private dialogService: TdDialogService,
        private auth: AuthenticationService
    ) {
        this.delete = new EventEmitter();
    }

    ngOnInit(): void {
        this.rest.fetchItinerariesByUnit(this.unit).subscribe(data => {
            this.itineraries = data._embedded.itineraries;
        });
    }

    deleteThis() {
        this.delete.emit();
    }

    deleteItinerary(itinerary: Itinerary) {
        this.rest.deleteItinerary(itinerary).subscribe(() => this.itineraries = this.itineraries.filter(i => i.id !== itinerary.id));
    }

    addItinerary(): void {
        this.dialogService.openPrompt({
            message: 'Introduzca el título',
            title: 'Añadir Nuevo Itinerario',
            cancelButton: 'Cancelar',
            acceptButton: 'Crear'
        }).afterClosed().subscribe((title: string) => {
            if (title) {
                this.rest.saveItinerary({ title, unit: this.unit }).subscribe(itinerary => {
                    this.itineraries.push(itinerary);
                });
            }
        });
    }

    get isAdmin() {
        return this.auth.isAdmin;
    }
}
