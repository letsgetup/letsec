import { Component, OnInit } from "@angular/core";
import { UserVehicleDetails } from "@app/_models";
import { LtsSharedService } from '@app/_services';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  insurancePlan: any;
  imagePath: string;
  userVehicle: UserVehicleDetails;

  constructor(private sharedService: LtsSharedService) {
    this.sharedService.getVehicleData().subscribe(data=>{this.userVehicle = data});
  }

  ngOnInit(): void {
    this.sharedService.getInsurancePlan().subscribe(plan =>{
      console.log(plan);
      this.insurancePlan = plan});
      this.insurancePlanProvider();
  }

  insurancePlanProvider(){
    if(this.insurancePlan.insuranceType === 'AIG'){
      this.imagePath = "../../assets/images/logo-AIG.png";
    } else {
      this.imagePath = "https://static.pbcdn.in/car-cdn/rct/images/36.png?v=2";
    }
  }

  totalPayableAmount(value1, value2): any {
    console.log(parseFloat(value1));
    console.log(parseFloat(value2));
    let p1 = parseFloat(value1);
    let p2 = parseFloat(value2);
    return (p1+p2);
  }
  
}
