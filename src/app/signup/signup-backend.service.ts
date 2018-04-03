import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { User } from '../shared/models/user.model';
import { SharedDataService } from '../shared/services/shared-data.service';
import { HttpService } from '../shared/services/http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class SignupBackendService {
    private _longinusApiUrl: string;
    constructor(
        private _sharedDataService: SharedDataService,
        private _http: HttpService) {
            this._longinusApiUrl = environment.longinus;
    }

    private _serverError = (err: any) => {
        console.log('doLogin error:', err);
        if (err instanceof Response) {
            return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    public createAccount = (user: User): Observable<any> => {
        const endpoint = `${this._longinusApiUrl}/users`;
        console.log('endpoint' + endpoint);
        return this._http.post(endpoint, user)
            .do(data => console.log('Create new user: ', data))
            .catch(err => this._serverError(err));
    }
}
