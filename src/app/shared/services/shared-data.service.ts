
import { Injectable, Inject, forwardRef } from '@angular/core';
import { User, UserObject } from '../models/user.model';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment.prod';
import { HttpService } from './http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class SharedDataService {
    public showSignup: Boolean;
    public user: User;
    private _longinusApiUrl: string;

    constructor(private _http: Http) {
        this.showSignup = false;
        this.user = new UserObject;
        this._longinusApiUrl = environment.longinus;
    }

    private _showSignupView = (): Boolean => {
        return this.showSignup;
    }

    private _serverError(err: any, functionName: string) {
        console.error('[ActivityBackendService.', functionName, '] error:', err);
        if (err instanceof Response) {
            return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    public doLogin = (userCredentials): Observable<any> => {
        const endpoint = `${this._longinusApiUrl}/login`;

        return this._http.post(endpoint, userCredentials)
            .do(data => console.log('[SharedDataService.doLogin] server data: ', data))
            .catch(err => this._serverError(err, 'doLogin'));
    }
}
