import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedDataService } from '../shared/services/shared-data.service';
import { User, UserObject } from '../shared/models/user.model';
import { UtilsService } from '../shared/services/utils.service';
import { LoginBackendService } from './login-backend.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
    public user: User;

    constructor(
        private _sharedDataService: SharedDataService,
        private _loginBackendService: LoginBackendService,
        private _utilsService: UtilsService

    ) {
        this.user = new UserObject;
    }

    ngOnInit() { }

    public doLogin(): void {
        console.log('Email:');
        console.log(this.user.email);
        console.log('Password:');
        console.log(this.user.password);
        if (!this.user.password || !this.user.email) {
            console.log('invalid fields!');
        } else {
            this._loginBackendService.doLogin(this.user)
                .subscribe(
                    result => {
                        result.password = this.user.password;
                        const sessionDate = new Date();
                    },
                    error => {
                        console.log('error bolado');
                    });
        }
    }

    public showSignupView = (): Boolean => {
        return this._sharedDataService.showSignup;
    }
    public toggleSignupView = (option: Boolean) => {
        this._utilsService.toggleSignupView(option);
    }
}
