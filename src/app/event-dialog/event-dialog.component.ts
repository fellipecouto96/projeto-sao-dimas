import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, DateAdapter, NativeDateAdapter } from '@angular/material';
import { Form } from '@angular/forms';
import { SharedDataService } from '../shared/services/shared-data.service';

@Component({
    selector: 'app-event-dialog',
    templateUrl: './event-dialog.component.html',
    styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {
    public selectedEvent: any;
    public goalStatus;
    public brDate: Date;
    constructor(
        private _dateAdapter: DateAdapter<NativeDateAdapter>,
        private _sharedDataService: SharedDataService,
        public dialogRef: MatDialogRef<EventDialogComponent>,
    ) {
        this.brDate = new Date;
        this.selectedEvent = {};
        _dateAdapter.setLocale('pt-BR');
        // this._verifySelectedDialog();
    }
    // public saveGoal = () => {
    //     if (this.hasSelectedGoal()) {
    //         this._updateGoal(this.selectedGoal);
    //     } else {
    //         this.selectedGoal.trainerId = this._sessionService.getEntitySummary().id;
    //         this.selectedGoal.athleteId = this._sessionService.getAthlete().athleteId;
    //         this.selectedGoal.deadline = this._utilsService.convertDateToUnixTimeStamp(this.brDate);
    //         const goalPayload = this._utilsService.renameKeysToCamel(this.selectedGoal);
    //         this._goalsBackendService
    //             .saveNewGoal(goalPayload)
    //             .subscribe(
    //             res => {
    //                 this._utilsService.showToast('success', null, 'create');
    //                 setTimeout(() => {
    //                     this.closeDialog();
    //                 }, 1000);
    //                 this._sharedDataService.kloader.hidekloader();
    //                 this._sharedDataService.changeRefreshGoal(new Date().getTime());
    //             },
    //             error => {
    //                 this._sharedDataService.kloader.hidekloader();
    //                 console.error('[GoalsDialog._saveNewGoals]: ' + error);
    //                 this._utilsService.showToast('error', null, 'create');
    //                 setTimeout(() => {
    //                     this.closeDialog();
    //                 }, 1000);
    //                 this.closeDialog();
    //             });
    //     }
    // }
    // public closeDialog = () => {
    //     this.dialogRef.close();
    //     this._sharedDataService.selectedGoal = null;
    // }
    // private _verifySelectedDialog = () => {
    //     if (this._sharedDataService.selectedGoal) {
    //         this.selectedGoal = Object.assign(new Goal, this._sharedDataService.selectedGoal);
    //         this.brDate = this._utilsService.timestampToDate(this._sharedDataService.selectedGoal.deadline);
    //     }
    // }

    // public hasSelectedGoal = (): boolean => {
    //     return this._sharedDataService.selectedGoal !== null;
    // }

    // private _updateGoal = (goal: Goal) => {
    //     this._goalsBackendService
    //         .updateGoal(goal)
    //         .subscribe(
    //         res => {
    //             goaconstructor() { }

    //             ngOnInit() {
    //             }

    //             l = res;
    //             this._utilsService.showToast('success', null, 'update');
    //             setTimeout(() => {
    //                 this.closeDialog();
    //             }, 1000);
    //             this._sharedDataService.changeRefreshGoal(new Date().getTime());
    //         },
    //         error => {
    //             console.error('[GoalsDialog._saveNewGoals]: ' + error);
    //             this._utilsService.showToast('error', null, 'update');
    //             setTimeout(() => {
    //                 this.closeDialog();
    //             }, 1000);
    //         }
    //         );
    // }
    // public deleteGoal = () => {
    //     const goalPayload = (this.selectedGoal);
    //     this._goalsBackendService
    //         .deleteGoal(goalPayload)
    //         .subscribe(
    //         response => {
    //             this._sharedDataService.changeRefreshGoal(new Date().getTime());
    //             this._utilsService.showToast('success', null, 'delete');
    //             setTimeout(() => {
    //                 this.closeDialog();
    //             }, 1000);
    //         },
    //         error => {
    //             console.error('[GoalsComponent.deleteGoal]: ' + error)
    //             this._utilsService.showToast('error', null, 'delete');
    //             setTimeout(() => {
    //                 this.closeDialog();
    //             }, 1000);
    //         });
    // }

}
