import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PhoneValidator {

  private static _phoneRegex = /^\([0-9]{2}\)[ ][0-9][ ][0-9]{4}-[0-9]{4}$/;


  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const isValid = this._validatePhone(control.value || '');
      return isValid ? {} : { 'error': 'Phone is invalid' }

    };
  }

  private static _validatePhone(formatedPhone) {
    // let phone = formatedPhone.replace(/[^\d]+/g, '');
    if (!this._phoneRegex.test(formatedPhone)) {
      return false;
    } else {
      return true;
    }
  }
}

