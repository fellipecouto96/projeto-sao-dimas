import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CnpjValidator {

  private static _cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;


  static cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let isValid = this._validateCNPJ(control.value || '');
      return isValid ? {} : { 'error': 'Cnpj is invalid' }

    };
  }

  private static _validateCNPJ(formatedCNPJ) {

    let cnpj = formatedCNPJ.replace(/[^\d]+/g, '');
    console.log(cnpj)
    if (cnpj == ''){
      console.log('cnpj vazio');
      return false;
    }  
      

    if (cnpj.length != 14){
      console.log('valor maior q 14');
      return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999')
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i: number = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)){
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i: number = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
       console.log('resultado charAT2');
       return false;
    }

    console.log('fim');

    return true;


  }

}