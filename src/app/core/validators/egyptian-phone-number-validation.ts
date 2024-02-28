import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EgyptianPhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const egyptianPhoneNumberRegex = /^(?:(?:\+|00)20)?(10|11|12|15|16|17|18|19)[0-9]{8}$/;
    const isValid = egyptianPhoneNumberRegex.test(control.value);
    return isValid ? null : { 'egyptianPhoneNumber': { value: control.value } };
  };
}