import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
})
export class CarComponent implements OnInit {
  carField : string = "Save upto 70% on your Car Insurance";
  motorType: String = "Car";
  closeResult = '';
  

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  open(content) {
    //this.modalService.open(id);
    //this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  isHovered(date: NgbDate) {
    console.log(date);
    //return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    console.log(date);
    //return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    console.log(date);
    //return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
