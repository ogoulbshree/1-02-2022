import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = control.get('start_time');
  const end = control.get('end_time');
  return start && end && start.value >= end.value ? { identityRevealed: true } : null;
};

@Directive({
  selector: '[appDateValidator]',
  providers: [{ provide: NG_VALIDATORS, useFactory: () =>  dateValidator, multi: true }]
})

export class DateValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return dateValidator(control);
  }
}
