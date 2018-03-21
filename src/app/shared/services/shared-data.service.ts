
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SharedDataService {
    public showSignup: Boolean;
    constructor() {
        this.showSignup = false;
    }

    private _showSignupView = (): Boolean => {
        return this.showSignup;
    }
}
