import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
// import { Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment.prod';
import { User } from '../shared/models/user.model';
import { SharedDataService } from '../shared/services/shared-data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class LoginBackendService {
  longinusApi: string;
  constructor(
    private _sharedDataService: SharedDataService) {
  }

  private _serverError = (err: any) => {
    console.log('doLogin error:', err);
    if (err instanceof Response) {
      return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }

  doLogin = (userCredentials): Observable<any> => {
    return this._sharedDataService.doLogin(userCredentials);
  }
}
