import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DragulaDirective } from 'ng2-dragula/components/dragula.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  droppedItems = [];
  options: any = {
    removeOnSpill: true
  };
  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);
  }
  constructor(private _dragulaService: DragulaService) {
    // _dragulaService.setOptions('bag-task1', {
    //   removeOnSpill: true
    // });
    // _dragulaService.setOptions('bag-task2', {
    //   revertOnSpill: true
    // });
    _dragulaService.setOptions('bag-task1', {
      copy: true
    });
  }
}
