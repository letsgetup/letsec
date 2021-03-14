import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidation } from '@app/_helpers';
import { UserVehicleDetails, UserDetails } from '@app/_models';
import { LtsSharedService } from '@app/_services';


@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html'
})
export class UserSectionComponent implements OnInit {
  @Input()
  vehicleDetails: UserVehicleDetails;
  userForm: FormGroup;
  _session: Object;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private customValidator: CustomValidation,
    private router: Router,
    private sharedService: LtsSharedService) {
    this.submitted = true;
  }

  ngOnInit(): void {
    console.log("time:::", this.currentTimeMilliSec);
    this.userForm = this.formBuilder.group({
      userfullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z\\s]*$')]],
      useremail: ['', [Validators.required, Validators.email], [this.customValidator.validateEmailNotTaken.bind(this.customValidator)]],
      usermobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)], [this.customValidator.validateMobileNotTaken.bind(this.customValidator)]],

    });
    //throw new Error('Method not implemented.');
  }

  currentTimeMilliSec() {
    var currentTimeInMilliseconds = Date.now();
    console.log("date:::", Date.now(), currentTimeInMilliseconds);
  }

  get formControl() {
    return this.userForm.controls;
  }

  gotolisting() {
    console.log("vh:", this.vehicleDetails);
    console.log("time:::", this.currentTimeMilliSec);
    this.submitted = true;

    if (this.userForm.controls['userfullname'].invalid
      || this.userForm.controls['useremail'].invalid
      || this.userForm.controls['usermobile'].invalid) {
      return false;
    } else {
      this.fetchUserDetails();
      this._session = this.userForm.value;
      sessionStorage.setItem("userinfo", JSON.stringify(this.userForm.value));
      this.router.navigate(['motor-insurance/quotes']);
    }
  }

  fetchUserDetails() {
    let user = new UserDetails();
    user.name = this.userForm.controls['userfullname'].value;
    user.email = this.userForm.controls['useremail'].value;
    user.contactNo = this.userForm.controls['usermobile'].value;

    this.vehicleDetails.user = user;
    this.sharedService.setVehicleData(this.vehicleDetails);
  }


}
