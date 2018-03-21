import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CpfValidator {

  private static _cpfRegex = /^([0-9]{3})([.])([0-9]{3})([.])([0-9]{3})([-])([0-9]{2})$/;


  static cpfValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const isValid = this._validateCPF(control.value || '');
      return isValid ? {} : { 'error': 'Cpf is invalid' };

    };
  }

  private static _validateCPF(formatedCPF) {
    if (!this._cpfRegex.test(formatedCPF)) {
      return false;
    }
    const strCPF = formatedCPF.replace(/[^\d]+/g, '');
    let Soma = 0;
    let Resto;
    if (strCPF === '00000000000') {
      return false;
    }
    for (let i = 1; i <= 9; i++) {

      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }

    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }
    if (Resto !== parseInt(strCPF.substring(9, 10))) {
      return false;
    }

    Soma = 0;

    for (let i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    }

    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }
    if (Resto !== parseInt(strCPF.substring(10, 11))) {
      return false;
    }
    return true;
  }



}

