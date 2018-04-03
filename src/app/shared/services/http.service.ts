import { Http, Headers, RequestOptions } from '@angular/http';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

    constructor(
        private _http: Http,
        private _utils: UtilsService
    ) { }

    private _options = (isAuthenticated: boolean): RequestOptions => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        return new RequestOptions({ headers: headers });
    }

    public delete = (endpoint: string, isAuthenticated = false): Observable<any> => {
        const options: RequestOptions = this._options(isAuthenticated);

        return this._http.delete(endpoint, options)
            .map(res => {
                return this._utils.renameKeysToCamel(res.json());
            });
    }

    public get = (endpoint: string, isAuthenticated = false): Observable<any> => {
        const options: RequestOptions = this._options(isAuthenticated);

        return this._http.get(endpoint, options)
            .map(res => {
                return this._utils.renameKeysToCamel(res.json());
            });
    }

    public post = (endpoint: string, payload: any, isAuthenticated = false): Observable<any> => {
        const payloadSnakeCase = this._utils.renameKeysToSnake({ ...payload });
        const options: RequestOptions = this._options(isAuthenticated);

        return this._http.post(endpoint, JSON.stringify(payloadSnakeCase), options  )
            .map(res => {
                return this._utils.renameKeysToCamel(res.json());
            });
    }

    public put = (endpoint: string, payload: any, isAuthenticated = false): Observable<any> => {
        const payloadSnakeCase = this._utils.renameKeysToSnake({ ...payload });
        const options: RequestOptions = this._options(isAuthenticated);

        return this._http.put(endpoint, JSON.stringify(payloadSnakeCase), options)
            .map(res => {
                return this._utils.renameKeysToCamel(res.json());
            });
    }
}
