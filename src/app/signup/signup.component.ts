import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { User, UserObject } from '../shared/models/user.model';
import { MatSnackBar } from '@angular/material';
import { SignupBackendService } from './signup-backend.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public user: User;

    constructor(private _utilsService: UtilsService,
        private _snackBar: MatSnackBar,
        private _signupBackendService: SignupBackendService
    ) {
        this.user = new UserObject;
    }
    ngOnInit() { }

    public toggleSignupView = (option: Boolean) => {
        this._utilsService.toggleSignupView(option);
    }

    public createAccount = () => {
        console.log('user');
        console.log(this.user);
        this._signupBackendService.createAccount(this.user).subscribe();
    }
}
