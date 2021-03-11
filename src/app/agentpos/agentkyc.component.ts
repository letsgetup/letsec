import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '@app/_helpers';
import { AlertService, AgentposService, UploadFilesService } from '@app/_services';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgentKYC } from '@app/_models';

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
  kyc = new AgentKYC();

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
      firstName: ['', [Validators.required, Validators.minLength(3) , Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]],
      middleName: ['', [Validators.required, Validators.minLength(3) , Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.minLength(3) , Validators.maxLength(15) ,Validators.pattern('^[a-zA-Z ]*$')]],
      // validates date format yyyy-mm-dd
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      extramobile: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      qualification: ['', Validators.required],
      pancard: ['',[ Validators.required, Validators.pattern(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/)]],
      address1: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[#.0-9a-zA-Z\s,-]+$')]],
      address2: ['', [Validators.minLength(5) , Validators.pattern('^[#.0-9a-zA-Z\s,-]+$')]],
      address3: ['', [Validators.minLength(5),  Validators.pattern('^[#.0-9a-zA-Z\s,-]+$')]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      bankname: ['', Validators.required],
      branchname: ['', Validators.required],
      accounttype: ['', Validators.required],
      accountnumber: ['', [Validators.required, Validators.minLength(9)]],
      ifsccode: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      GSTNumber: [''],
      document1: ['', Validators.required],
      fileSource1: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      document2: ['', Validators.required],
      fileSource2 : ['',Validators.required],
      document3: ['', Validators.required],
      fileSource3 : ['',Validators.required],
      aadharcard : ['', [Validators.required, Validators.minLength(12)]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    if (sessionStorage.getItem("agentinfo") != null) {
      console.log(sessionStorage.getItem("agentinfo"))
      this._session = JSON.parse(sessionStorage.getItem("agentinfo"));
      //console.log(this._session)
      if (this._session['agentphone']) {
        this.posKycForm.controls.mobile.setValue(this._session['agentphone']);
        this.posKycForm.controls.email.setValue(this._session['agentemail']);
        this.posKycForm.controls.pincode.setValue(this._session['pincode'].pincode1);
        this.posKycForm.controls.city.setValue(this._session['pincode'].city);
        this.posKycForm.controls.state.setValue(this._session['pincode'].state);
        this.posKycForm.controls.mobile.disable();
        this.posKycForm.controls.email.disable();
        this.posKycForm.controls.pincode.disable();
        this.posKycForm.controls.city.disable();
        this.posKycForm.controls.state.disable();
      }

    }




  }

  onFileChange1(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.kyc.document1 = this.uploadFileToActivity(file,'fileSource1');
    }
  }
  onFileChange2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.kyc.document2 = this.uploadFileToActivity(file,'fileSource2');
    }
  }
  onFileChange3(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.kyc.document3 = this.uploadFileToActivity(file,'fileSource3');
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
    sessionStorage.removeItem("agentinfo");
    sessionStorage.removeItem('agentConfim_flg');
    this.posKycForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.posKycForm.invalid) {
      return;
    }

    this.kyc.document1 = this.posKycForm.get('fileSource1').value;
    this.kyc.document2 = this.posKycForm.get('fileSource2').value;
    this.kyc.document3 = this.posKycForm.get('fileSource3').value;
    this.kyc.gender = this.posKycForm.get('gender').value;
    this.kyc.firstname = this.posKycForm.get('firstName').value;
    this.kyc.middlename = this.posKycForm.get('middleName').value;
    this.kyc.lastname = this.posKycForm.get('lastName').value;
    this.kyc.dob = this.posKycForm.get('dob').value;
    this.kyc.mobile = this.posKycForm.get('mobile').value;
    this.kyc.email = this.posKycForm.get('email').value;
    this.kyc.extramobile = this.posKycForm.get('extramobile').value;
    this.kyc.password = this.posKycForm.get('password').value;
    this.kyc.qualification = this.posKycForm.get('qualification').value;
    this.kyc.pancard = this.posKycForm.get('pancard').value;
    this.kyc.address1 = this.posKycForm.get('address1').value;
    this.kyc.address2 = this.posKycForm.get('address2').value;
    this.kyc.address3 = this.posKycForm.get('address3').value;
    this.kyc.state = this.posKycForm.get('state').value;
    this.kyc.city = this.posKycForm.get('city').value;
    this.kyc.pincode = this.posKycForm.get('pincode').value;
    this.kyc.bankname = this.posKycForm.get('bankname').value;
    this.kyc.branchname = this.posKycForm.get('branchname').value;
    this.kyc.accountnumber = this.posKycForm.get('accountnumber').value;
    this.kyc.accounttype = this.posKycForm.get('accounttype').value;
    this.kyc.ifsccode = this.posKycForm.get('ifsccode').value;
    this.kyc.gsTnumber = this.posKycForm.get('GSTNumber').value;
    this.kyc.aadharcard = this.posKycForm.get('aadharcard').value;
    this.kyc.status = 0;

    this.agentposService.agentposconfirmregister(this.kyc)
      .pipe(first())
      .subscribe({
        next: () => {
          sessionStorage.setItem('agentConfim_flg', "DONE");
          this.router.navigate(["../agentconfirm"]);
        },
        error: error => {
          this.alertService.error("We found bad request.Please contact sysadmin.");
          this.loading = false;
          this.router.navigate(["../agent-process-error"])
        }
      });
  
   
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

  uploadFileToActivity(fileToUpload : File, fileSource: any) : any {
    this.uploadfilesService.uploadFile(fileToUpload).subscribe(data => {
      setTimeout(function () {
        this.showElement = false;
        }, 2000);        
        if(data.dbPath){          
          this.posKycForm.controls[fileSource].setValue(data.dbPath);
          return data.dbPath + '';
        }        
      }, error => {
        console.log(error);
      });
  }

}
