import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { Component, OnInit } from '@angular/core';
import { AgentUser } from '@app/_models';
import { AgentService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '@app/_helpers';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  agentuser: AgentUser;
  
  _session: string;
  agentKycForm: FormGroup;
  loading = false;
  submitted = false;
  fileInfos: '';
  message = '';
  closeResult: string;
  agentid:string;
  
  constructor(
    private formBuilder: FormBuilder,
    private agentService: AgentService,
    private modalService: NgbModal) {
    this.agentuser = this.agentService.agentuserValue; 
    this.agentid = this.agentuser.agentid;
  }
  get f() { return this.agentKycForm.controls; }
  ngOnInit(): void {

    this.agentKycForm = this.formBuilder.group({
      gender: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      // validates date format yyyy-mm-dd
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      extramobile: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      qualification: ['', Validators.required],
      pancard: ['',[ Validators.required, Validators.pattern(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/)]],
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

    this.agentService.getAgentById(this.agentid)
                .pipe(first())
                .subscribe(x =>{
                    const formvalue= JSON.parse(x);
                    this.agentKycForm.patchValue(formvalue) 
                    this.agentKycForm.controls.confirmPassword.setValue(formvalue.password)
                    this.fileInfos= formvalue.document
                } );
                // Disabled all elemnts for the form just show with values
                this.agentKycForm.disable();
                
  }
  onFileChange(event) {}
  onReset() {}
  onSubmit() {}

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
