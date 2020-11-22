import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CustomService } from '@app/_services'

@Injectable({
  providedIn: "root"
})
export class CustomValidation {
  constructor(private http: HttpClient, private customService : CustomService) {}

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.customService.checkEmailNotTaken(control.value).pipe(
      map(res => {
        return res['status']==1 ? null : { emailTaken: true };
      })
    );
  }


  validateMobileNotTaken(control: AbstractControl) {
    return this.customService.checkMobileNotTaken(control.value).pipe(
      map(res => {
        return res['status']==1 ? null : { mobileTaken: true };
      })
    );
  }


 
}