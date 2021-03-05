import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DigitInsuranceDetails, Vehicle } from '../../../_models/digit-insurance-details';
import { CustomService } from '@app/_services';
import digitdata from "../../assets/json/digitdata.json";
import tataaig from "../../assets/json/tataaig.json";
import { TataAigInsurance } from '@app/_models/tata-aig-insurance';
import { Router } from '@angular/router';
import { LtsSharedService } from '@app/_services';
import { UserVehicleDetails } from '@app/_models';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnyNaptrRecord } from 'dns';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnInit {
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  vehicleListForm: FormGroup;
  tataAig2W: TataAigInsurance;
  digitTwoWheeler: DigitInsuranceDetails;
  userVehicle: UserVehicleDetails;
  isApi: boolean = false;
  isSelectAllInsurer: boolean = false;
  insurancePlan: InsurancePlan;
  closeResult = '';
  objectPolicy: ObjectPolicy;
  vehicleData: VehicleDetails;
  policyExpireDate: any;
  claimBonus: any[] = ['0', '20', '25', '35', '45', '50'];
  enumInsurer = InsurerEnum;
  enumIDV = IdvEnum;
  enumAddon = AddOnsEnum;
  enumAccessory = AccessoriesEnum;
  selectedIdv: any;
  selectedModalClaim: any;
  

  constructor(private customService: CustomService,
    private router: Router,
    private sharedService: LtsSharedService,
    private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.getFourWheelerData();
   }

  ngOnInit(): void {
    console.log("enum", this.enumInsurer);
    this.vehicleListForm = this.formBuilder.group({
      maker: ['', [Validators.required]],
      model: ['', [Validators.required]],
      variant: ['', [Validators.required]],
      fuel: ['', [Validators.required]]
    });
    this.sharedService.getVehicleData().subscribe(data=>{this.userVehicle = data});
    console.log('data:',this.userVehicle.vehicleVariant);
    this.customService.getDemoListingData("").subscribe(apiData=>{ if(apiData != undefined) this.isApi = true;});
    this.fetchInsuranceData();

    this.initializeThirdPartyObj();
    this.initializeuserVehicleData();

  }

  initializeuserVehicleData(){
    this.vehicleListForm.controls['maker'].setValue(this.userVehicle.vehicleMenufacturer);
    this.vehicleListForm.controls['model'].setValue(this.userVehicle.vehicleModel);
    this.vehicleListForm.controls['variant'].setValue(this.userVehicle.vehicleVariant);
    this.vehicleListForm.controls['fuel'].setValue(this.userVehicle.fuelType);
  }

  initializeThirdPartyObj(){
    this.objectPolicy = new ObjectPolicy();
    this.objectPolicy.UserName = "WIBL";
    this.objectPolicy.ProductCode = '2311';
    this.objectPolicy.TraceID = 'TAPI190520008063';
    this.objectPolicy.PolicyStartDate = '2021-02-01';
    this.objectPolicy.SessionID = '';
    this.objectPolicy.TPSourceName = '7';
    this.objectPolicy.BusinessTypeID = '25';

    this.vehicleData = new VehicleDetails();
    this.vehicleData.MakeModelVarient="MARUTI SUZUKI|1000|AC|970CC";
    this.vehicleData.RtoLocation="MH02";
    this.vehicleData.RegistrationDate="2020-01-01";
    this.vehicleData.ManufacturingMonth="2017";
    this.vehicleData.ManufacturingMonth="05";

    this.customService.getThirdPartyInsurance(this.objectPolicy, this.vehicleData)
      .subscribe(r=>{console.log('res::', r)});
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

  openConfirm(content) {
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

  policyExpiryDate(date:any){
    console.log('listng expry::::', date);
    this.policyExpireDate = date;
  }

  fetchInsuranceData(){
    if(this.isApi) {

    }else{
      if(this.userVehicle.vehicleType === 'Car') {
        this.getFourWheelerData();
      }else{
        this.getTwoWheelerData();
      }
    }
  }

  getTwoWheelerData(){
    this.getTwoWheelerDigitJsonData();
    this.getTwoWheelerTataAigJsonData();
  }

  getFourWheelerData(){
    this.getCarTataAigJsonDat();
    this.getCarDigitJsonData();
  }

  getTwoWheelerDigitJsonData() {
    this.customService.getLocalJsonFileData("../../assets/json/digitdata.json")
      .subscribe(json => {
        this.digitTwoWheeler = json[0];
        console.log("json obj>>digit>>>>", this.digitTwoWheeler.netPremium);
      });
  }

  getTwoWheelerTataAigJsonData(){
    this.customService.getLocalJsonFileData("../../assets/json/tataaig.json")
      .subscribe(json => {
        this.tataAig2W = json[0].data;
        console.log("json obj>>tata1>>>>", this.tataAig2W);
      });
  }

  getCarTataAigJsonDat(){
    this.customService.getLocalJsonFileData("../../assets/json/tatacar.json")
    .subscribe(json => {
      this.tataAig2W = json[0].data;
      console.log("json obj>>tata car>>>>", this.tataAig2W);
    });
  }

  getCarDigitJsonData(){
    this.customService.getLocalJsonFileData("../../assets/json/digitcar.json")
    .subscribe(json => {
      this.digitTwoWheeler = json[0];
      console.log("json obj>>digit car>>>>", this.digitTwoWheeler);
    });
  }

  selectAigPlan(idv: string, premium: string){
    let user=this.userVehicle.user;
    let plan = new InsurancePlan("AIG", premium, idv, user.contactNo, user.email);
    this.sharedService.setInsurancePlan(plan);
    this.changeRouteToPayment();
  }

  selectDigitPlan(idv: string, premium: string) {
    let user=this.userVehicle.user;
    let plan = new InsurancePlan("DIGIT", premium.split(" ")[1], idv, user.contactNo, user.email);
    this.sharedService.setInsurancePlan(plan);
    this.changeRouteToPayment();
  }

  changeRouteToPayment() {
    this.router.navigate(['motor-insurance/payment']);
  }

  selectBonus(bonus: any) {
    console.log("claim bonus %:::", bonus);
  }

  selectInsurer(insurer: any) {
    console.log("selectInsurer %:::", insurer);
  }

  selectAllInsurer(event) {
    console.log("selectAllInsurer %:::", event.target.checked);
    this.isSelectAllInsurer = event.target.checked;
  }

  onIDVChange(value: any){
    this.selectedIdv = value;
  }

  policyClaimInModal(claim: any){
    console.log("selectd claim :::", claim);
    if(claim != 'Not Sure') {
      this.selectedModalClaim = claim === 'No' ? 'No' : 1;
    }
  }
  onSubmitVehicleDetails(modal){
    this.updateVehicleDetails();
    modal.close('Close click');
    //this.validateFuelType();
  }

  updateVehicleDetails() {
    this.userVehicle.vehicleMenufacturer = this.vehicleListForm.controls['maker'].value;
    this.userVehicle.vehicleModel = this.vehicleListForm.controls['model'].value;
    this.userVehicle.vehicleVariant = this.vehicleListForm.controls['variant'].value;
    this.userVehicle.fuelType = this.vehicleListForm.controls['fuel'].value;
  }

  validateFuelType(){
    let fuelList: any[];
    let variant = this.vehicleListForm.controls['variant'].value;
    
    this.customService.getTmpSearchedFueltypes(this.vehicleListForm.controls['maker'].value, 
      this.vehicleListForm.controls['model'].value, (variant.split('-')[0]).trim()).subscribe(fuel=>{
      fuelList = [];
      console.log('fuel::', fuel);
      fuelList = fuel;
    });
  }

}

export class NgbdDatepickerMultiple {
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
}

export class InsurancePlan {
  insuranceType: string;
  premium: string;
  idv: string;
  userMobile: string;
  userEmail: string;

  constructor(insuranceType: string, premium: string, idv: string, userMobile: string,userEmail: string){
    this.insuranceType = insuranceType;
    this.premium = premium;
    this.idv = idv;
    this.userMobile = userMobile;
    this.userEmail = userEmail;
  }
}


export class ObjectPolicy {
  UserName: string;
  ProductCode: string;
  TraceID: string;
  PolicyStartDate: string;
  SessionID: string;
  TPSourceName: string;
  BusinessTypeID: string;
}

export class VehicleDetails {
  MakeModelVarient: string;
  RtoLocation: string;
  RegistrationDate: string;
  ManufacturingYear: string;
  ManufacturingMonth: string;
}

export enum InsurerEnum {
  I1 = 'Digit General Insurance',
  I2 = 'Tata Aig',
  I3 = 'Bajaj Allianz'
}

export enum IdvEnum {
  I1 = 'Lowest IDV',
  I2 = 'Recommended IDV(₹ 43,345)',
  I3 = 'Maximum IDV'
}

export enum AddOnsEnum {
  A1 = 'Zero Depreciation',
  A2 = '24x7 Roadside Assistance',
  A3 = 'Engine Protection Cover',
  A4 = 'NCB Protector',
  A5 = 'Key & Lock Replacement',
  A6 = 'Kotak General Insurance',
}

export enum AccessoriesEnum {
  A1 = 'Electrical',
  A2 = 'Non-Electrical',
  A3 = 'External Bi Fuel Kit',
}


