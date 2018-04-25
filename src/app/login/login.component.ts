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
    public userCredentials = {
        email: '',
        password: ''
    };
    constructor(
        private _sharedDataService: SharedDataService,
        private _loginBackendService: LoginBackendService,
        private _utilsService: UtilsService,
        private _router: Router
    ) { }

    ngOnInit() { }

    public doLogin(): void {
        if (!this.userCredentials.password || !this.userCredentials.email) {
            console.log('invalid fields!');
        } else {
            this._loginBackendService.doLogin(this.userCredentials)
                .subscribe(
                    result => {
                        this._router.navigate(['/main', {
                            outlets: {
                                'main': ['home']
                            }
                        }]);
                    },
                    error => {
                        console.log('error');
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
