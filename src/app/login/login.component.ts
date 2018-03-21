import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared/services/shared-data.service';
import { UtilsService } from '../shared/services/utils.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private _utilsService: UtilsService, private _sharedDataService: SharedDataService) {
    }

    ngOnInit() { }

    public redirect = () => {
        //
    }
    public showSignupView = (): Boolean => {
        return this._sharedDataService.showSignup;
    }
    public toggleSignupView = (option: Boolean) => {
        this._utilsService.toggleSignupView(option);
    }
}
