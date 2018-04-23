import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../shared/services/utils.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})

export class EventsComponent {
  constructor(private _utilsService: UtilsService) {
    console.log('Manja o constructor do events ae!');
  }
}
