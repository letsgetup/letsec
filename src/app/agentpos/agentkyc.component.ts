import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '@app/_helpers';
import { AlertService, AgentposService, UploadFilesService } from '@app/_services';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({

  templateUrl: './agentkyc.component.html'

})
export class AgentkycComponent implements OnInit, OnDestroy {
  _session: string;
  posKycForm: FormGroup;
  loading = false;
  submitted = false;
  fileInfos: '';
  message = '';
  closeResult: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private uploadfilesService: UploadFilesService,
    private agentposService: AgentposService,
    private modalService: NgbModal
  ) {

    if (sessionStorage.getItem("agentinfo") === null) {
      this.router.navigate(['../agentpos']);
    }

  }

  get f() { return this.posKycForm.controls; }
  ngOnInit(): void {
    this.posKycForm = this.formBuilder.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      extramobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      qualification: ['', Validators.required],
      pancard: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      address3: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      bankname: ['', Validators.required],
      branchname: ['', Validators.required],
      accounttype: ['', Validators.required],
      accountnumber: ['', Validators.required],
      ifsccode: ['', Validators.required],
      document: ['', Validators.required],
      fileSource: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      document_hid: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    if (sessionStorage.getItem("agentinfo") != null) {
      console.log(sessionStorage.getItem("agentinfo"))
      this._session = JSON.parse(sessionStorage.getItem("agentinfo"));
      //console.log(this._session)
      if (this._session['agentphone']) {
        console.log("hi")
        this.posKycForm.controls.mobile.setValue(this._session['agentphone']);
        this.posKycForm.controls.email.setValue(this._session['agentemail']);
        this.posKycForm.controls.pincode.setValue(this._session['pincode']);
        this.posKycForm.controls.mobile.disable();
        this.posKycForm.controls.email.disable();
      }

    }




  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.posKycForm.patchValue({
        fileSource: file
      });
      this.posKycForm.get('fileSource').updateValueAndValidity()
    }

  }
  openWithConfirmation(event) {
    console.log(event.isTrusted)
    if (event.isTrusted) {
      this.open("mymodal")
      return;
    }
  }
  onReset() {
    this.submitted = false;
    this.posKycForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.posKycForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append("document", this.posKycForm.get('fileSource').value);

    formData.append("gender", this.posKycForm.get('gender').value)
    formData.append("firstName", this.posKycForm.get('firstName').value)
    formData.append("middleName", this.posKycForm.get('middleName').value)
    formData.append("lastName", this.posKycForm.get('lastName').value)
    formData.append("dob", this.posKycForm.get('dob').value)
    formData.append("mobile", this.posKycForm.get('mobile').value)
    formData.append("email", this.posKycForm.get('email').value)
    formData.append("extramobile", this.posKycForm.get('extramobile').value)
    formData.append("password", this.posKycForm.get('password').value)
    //formData.append("confirmPassword",this.posKycForm.get('confirmPassword').value)
    formData.append("qualification", this.posKycForm.get('qualification').value)
    formData.append("pancard", this.posKycForm.get('pancard').value)
    formData.append("address1", this.posKycForm.get('address1').value)
    formData.append("address2", this.posKycForm.get('address2').value)
    formData.append("address3", this.posKycForm.get('address3').value)
    formData.append("state", this.posKycForm.get('state').value)
    formData.append("city", this.posKycForm.get('city').value)
    formData.append("pincode", this.posKycForm.get('pincode').value)
    formData.append("bankname", this.posKycForm.get('bankname').value)
    formData.append("branchname", this.posKycForm.get('branchname').value)
    formData.append("accounttype", this.posKycForm.get('accounttype').value)
    formData.append("accountnumber", this.posKycForm.get('accountnumber').value)
    formData.append("ifsccode", this.posKycForm.get('ifsccode').value)
    //formData.append("document",this.posKycForm.get('document').value)


    this.agentposService.agentposconfirmregister(formData)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Next")
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
    sessionStorage.setItem('agentConfim_flg', "DONE");
    this.router.navigate(["../agentconfirm"]);
   
  }

  public ngOnDestroy(): void {
    //console.log("Destroy..")
    //sessionStorage.removeItem("agentinfo");
    // console.log(sessionStorage.getItem("agentinfo"))
    // delete sessionStorage.agentinfo;

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Dismissed ${this.getDismissReason(result)}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
