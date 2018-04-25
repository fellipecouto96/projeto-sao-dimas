import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { UtilsService } from '../shared/services/utils.service';
import { SharedDataService } from '../shared/services/shared-data.service';
import { MatDialog, MatDialogRef, DateAdapter, NativeDateAdapter } from '@angular/material';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import {FormControl} from '@angular/forms';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';


@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: [
        './events.component.css',
        '../../../node_modules/angular-calendar/css/angular-calendar.css'
    ],
})

export class EventsComponent {
    public view = 'month';
    public viewDate = new Date();
    public activeDayIsOpen = true;
    public date: FormControl = new FormControl(new Date());
    public hour = new Date();
    public selectedType: any;
    public newEventOpen = false;
    refresh: Subject<any> = new Subject();
    public readonly colors: any = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
        }
    };
    public actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];
    public eventTypes: any[] = [
        {
            value: 'Casamento',
            viewValue: 'Casamento'
        },
        {
            value: 'Batismo',
            viewValue: 'Batismo'
        },
        {
            value: 'Missa de sétimo dia',
            viewValue: 'Missa de sétimo dia'
        }
    ];
    public events: CalendarEvent[] = [
        {
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'Evento teste',
            color: this.colors.red,
            actions: this.actions
        },
        {
            start: startOfDay(new Date()),
            title: 'Bankai',
            color: this.colors.yellow,
            actions: this.actions
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'Esse gui',
            color: this.colors.blue
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: new Date(),
            title: 'Sem or',
            color: this.colors.yellow,
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: true
        }
    ];


    constructor(
        private _utilsService: UtilsService,
        private _shared: SharedDataService,
        private _eventDialog: MatDialog
    ) {
        this._shared.getEvents()
            .subscribe(response => {
                this.events = [];
                const events = response.json().events;
                for (const event of events){
                    this.events.push({
                        start: new Date(event.eventStartDate),
                        end: new Date(event.eventEndDate),
                        title: event.eventType,
                        color: this.colors.red,
                        actions: this.actions
                    });
                }
                console.error(this.events);
                this.refresh.next();
            });
    }


    public handleEvent(action: string, event: CalendarEvent): void {

    }

    public dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    public saveEvent = (): void => {
        console.error(this.hour);
        this.date.value.setHours(this.hour.toString().split(':')[0]);
        this.date.value.setMinutes(this.hour.toString().split(':')[1]);
        console.error(this.date);
        console.error(this.selectedType);

        const newEvent: any = {
            start: this.date.value,
            end: addHours(this.date.value, 2),
            title: this.selectedType,
            color: this.colors.red,
            actions: this.actions
        };

        this.events.push(newEvent);
        this.refresh.next();
        this._shared.saveEvent({
            eventStartDate: newEvent.start.toISOString(),
            eventEndDate: newEvent.end.toISOString(),
            eventType: newEvent.title
        }).subscribe(() => {
            this.newEventOpen = false;
        });
    }
}
