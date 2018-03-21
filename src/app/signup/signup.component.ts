import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { User, UserObject } from '../shared/models/user.model';
import { MatSnackBar } from '@angular/material';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public user: User;

    constructor(private _utilsService: UtilsService, private _snackBar: MatSnackBar) {
        this.user = new UserObject;
    }
    ngOnInit() { }

    public toggleSignupView = (option: Boolean) => {
        this._utilsService.toggleSignupView(option);
    }

    public createNewAccount = () => {
        console.log(this.user);
    }
}
