import { AbstractControl, ValidatorFn } from '@angular/forms';

export class EmailValidator {

    private static _emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static emailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const isValid = this._validateEmail(control.value || '');
            return isValid ? {} : { 'error': 'email is invalid' };

        };
    }

    private static _validateEmail(email) {
        return this._emailRegex.test(email);
    }
}

