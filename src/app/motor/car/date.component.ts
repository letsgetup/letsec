import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxCalendarComponent } from 'ss-ngx-calendar';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html'
})

export class DateComponent implements OnInit {
  @ViewChild("ngxCalendar1") ngxCalendar1: NgxCalendarComponent;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  @Output() expiryDate: EventEmitter<any> = new EventEmitter();
  @Output() policyClaim: EventEmitter<any> = new EventEmitter();
  @Output() claimSelected: EventEmitter<boolean> = new EventEmitter();
  calendarOptions = {};
  calendarValue = null;
  showModal = false;
  closeResult = '';
  eClaim = ClaimEnum;
  ePolicyExpire = PolicyExpireEnum;
  selectedClaimValue: any;
  policyExpiryState: any;

  constructor(private router: Router, private modalService: NgbModal,
    private datepipe: DatePipe) {

  }

  ngAfterViewInit() {
    this.showModal = true;
  }

  ngOnInit() {
    this.openCalender(this.content);
  }

  onChooseDate(date: any, claim) {
    this.calendarValue = date;
    this.expiryDate.emit(this.datepipe.transform(date, 'yyyy-MM-dd'));
    this.openCalender(claim);
  }

  onClose() {
    this.showModal = false;
    //Allow fade out animation to play before navigating back
    setTimeout(
      () => this.router.navigate(['..']),
      100
    );
  }

  openCalender(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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

  onClaimChange(claim: any) {
    this.selectedClaimValue = claim.value;
    this.policyClaim.emit(claim.value);
    console.log('selected:::', claim.value);
    this.closeModal();
  }

  onExpiryChange(expiry: any, claim) {
    console.log('onExpiryChange:::', expiry);
    this.policyExpiryState = expiry.value;
    if(expiry.key != 'E5'){
      this.openCalender(claim);
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.claimSelected.emit(true);
    this.modalService.dismissAll('Esc');
  }

}


export enum ClaimEnum {
  C1 = 'Yes',
  C2 = 'No',
  C3 = 'Not Sure'
}

export enum PolicyExpireEnum {
  E1 = 'Policy not expired yet',
  E2 = 'Policy expired within 2 months',
  E3 = 'Policy expired within 2 - 3 months ago',
  E4 = 'Policy expired more than 3 months ago',
  E5 = 'I have bought new car'
}