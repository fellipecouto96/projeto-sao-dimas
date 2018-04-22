
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedDataService } from '../services/shared-data.service';
import { MatSidenav } from '@angular/material/sidenav';


@Injectable()
export class UtilsService {
    public sidenav: any;

    private _snackBarErrors = {
        'internalError': 'Internal error ocurred.',
        'invalidFields': 'Verify the fields.',
        'create': 'Register error.',
        'update': 'Update error.',
        'delete': 'Delete error.',
        'save': 'Save error',
    };
    private _snackBarSuccess = {
        'create': 'Created :)',
        'delete': 'Deleted :)',
        'update': 'Updated :)',
        'save': 'Saved :)'
    };

    constructor(private _sharedDataService: SharedDataService) {
    }

    public setSidenav = (sidenav: MatSidenav) => {
        this.sidenav = sidenav;
    }

    public openSidenav = () => {
        this.sidenav.open();
    }

    public closeSidenav = () => {
        this.sidenav.close();
    }

    public toggleSignupView = (option: Boolean) => {
        this._sharedDataService.showSignup = option;
    }

    public timestampToDate = (timestamp: number): Date => {
        return new Date(timestamp * 1000);
    }

    private _snakeToCamel = snake => {
        return snake.replace(/(\_\w)/g, m => m[1].toUpperCase());
    }

    private _camelToSnake = camel => {
        return camel.replace(/\W+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
    }

    public renameKeysToCamel = (myObject) => {
        if (myObject) {
            const oldKeys = Object.keys(myObject);
            oldKeys.forEach(key => {
                myObject[this._snakeToCamel(key)] = myObject[key];
                if (typeof myObject[this._snakeToCamel(key)] === 'object') {
                    const newObject = this.renameKeysToCamel(myObject[this._snakeToCamel(key)]);
                    myObject[this._snakeToCamel(key)] = newObject;
                }
                if (this._snakeToCamel(key) !== key) {
                    delete myObject[key];
                }
            });
        }
        return myObject;
    }

    public renameKeysToSnake = myObject => {
        const oldKeys = Object.keys(myObject);
        oldKeys.forEach(key => {
            myObject[this._camelToSnake(key)] = myObject[key];
            if (typeof myObject[this._camelToSnake(key)] === 'object') {
                const newObject = this._camelToSnake(myObject[this._camelToSnake(key)]);
                myObject[this._camelToSnake(key)] = newObject;
            }
            if (this._camelToSnake(key) !== key) {
                delete myObject[key];
            }
        });
        return myObject;
    }
}
