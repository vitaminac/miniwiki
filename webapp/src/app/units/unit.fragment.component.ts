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
export class UnitsFragmentComponent {
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

    deleteThis() {
        this.delete.emit();
    }

    deleteItinerary(itinerary: Itinerary) {
        this.dialogService.openConfirm({
            message: 'Estás seguro de que deseas eliminar ' + itinerary.title,
            title: 'Eliminar ' + itinerary.title,
            cancelButton: 'Cancelar',
            acceptButton: 'Confirmar'
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this.rest.deleteItinerary(itinerary)
                    .subscribe(() => this.unit.itineraries = this.unit.itineraries.filter(i => i.id !== itinerary.id));
            }
        });
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
                    this.unit.itineraries.push(itinerary);
                });
            }
        });
    }

    get isAdmin() {
        return this.auth.isAdmin;
    }
}
