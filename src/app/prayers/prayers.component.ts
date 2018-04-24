import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/services/shared-data.service';

@Component({
    selector: 'app-prayers',
    templateUrl: './prayers.component.html',
    styleUrls: ['./prayers.component.css']
})
export class PrayersComponent implements OnInit {
    public prayerDescription: string;

    constructor(
        private _shared: SharedDataService
    ) { }

    ngOnInit() {
    }

    public savePrayer = () => {
        console.error(this.prayerDescription);
        this._shared.savePrayer({
            description: this.prayerDescription,
            userId: 123456
        }).subscribe(() => {
            this.prayerDescription = '';
        });
    }

}
