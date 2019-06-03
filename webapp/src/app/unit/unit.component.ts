import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Itinerary } from '../model/itinerary';
import { Unit } from '../model/unit';
import { UnitService } from '../service/unit.service';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
    unit: Unit;
    itineraries: Itinerary[];

    constructor(
        private route: ActivatedRoute,
        private rest: UnitService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.rest.fetchUnit(params.id).subscribe((unit) => {
                this.unit = unit;
                this.rest.fetchItinerariesByUnit(unit).subscribe((data) => {
                    this.unit.itineraries = data._embedded.itineraries;
                });
            });
        });
    }
}
