import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidation } from '@app/_helpers';
import { AlertService, CacheService, CustomService } from '@app/_services';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { UserVehicleDetails } from '@app/_models';
import { NgbCalendar, NgbDate, NgbDateStruct,NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-motor-info',
  templateUrl: './motor-info.component.html',
  styleUrls: ['./motor-info.component.less']
})
export class MotorInfoComponent implements OnInit {
  motorInfoForm: FormGroup;
  @Input()
  motorType: string;
  @Input()
  motorDetails: string;
  submitted: boolean = false;
  listRTO: any = [];
  _session: Object;
  loading = false;
  cacheService = CacheService;
  citiesList: any = [];
  stateList: any = [];
  cityList: any = [];
  rtoList: any = [];
  clickedItem: string;
  public model: any;
  setState: any;
  strRTO: string;
  rtoDetails: any = [];
  listMaker: any = [];
  makersList: any = [];
  modelList: any = [];
  fversionList: any = [];
  makerDetails: any = [];
  fuelList: any = [];
  strMaker: string;
  selectedRTOState: string;
  selectedRTOCity: string;
  userVehicleDetails: UserVehicleDetails;
  fuelTypes = Object.values(FuelTypesEnum);
  calenderYear: any[] = [];
  closeResult:any;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private customService: CustomService,
    private customValidator: CustomValidation,
    private calendar: NgbCalendar, 
    private modalService: NgbModal) {
      this.userVehicleDetails = new UserVehicleDetails();
    }
    

  ngOnInit(): void {
    console.log("motor:", this.motorType);
    this.motorInfoForm = this.formBuilder.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$')]],
      state: ['0'],
      city: ['0'],
      rto: ['0'],
      maker: ['0'],
      model: ['0'],
      variant: ['0'],
      fueltype: ['0'],
      year: ['0']
    });

    //this.bindallState();
    //this.bindallMakers();
    $('#btn-proceedwithoutNum').add('#btn-proceednewcar').on('click', function () {
      $('#rto-section').show();
      $('#form-viewPlans').hide();
    });
    //cache part
    //if (sessionStorage.getItem("userinfo")) {
    //  this.motorInfoForm.setValue(JSON.parse(sessionStorage.getItem("userinfo")));
   // }
   this.calenderYears();
  }

  selectWithOutRegNo() {
    console.log("without vehicle no");
  }

  selectNewVehicle() {
    console.log("new vehicle no");
    this.userVehicleDetails.isNewVehicle = true;
  }
  openModal(content) {
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

  selectToday() {
    this.model = this.calendar.getToday().year;
  }

  calenderYears(){
    var max = new Date().getFullYear(),
    min = max - 20;

    for(var i=min; i<=max; i++){
      this.calenderYear.push({"id":i});
    }
  }

  get formControl() {
    return this.motorInfoForm.controls;
  }

  // Auto complete functionality
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => this.listRTO)
    )
  formatter = (x: { region_code: string }) => x.region_code;
  // tslint:disable-next-line: typedef
  getSearchedrtos(termRTO: string) {
    console.log("getSearchedrtos:", termRTO);
    this.customService.getSearchedrtos(termRTO).subscribe(dataRTO => {
      this.listRTO = dataRTO;
      console.log(">rto::>", this.listRTO);
    });
    //this.getSearchedStates(termRTO);
    //this.getSearchedCities(termRTO);
  }

  getSearchedStates(text: string){
    
    this.customService.getSearchedStates(text).subscribe(states =>{
      this.stateList = states;
      console.log(">states::>", this.stateList);
    });
  }

  getSearchedCities(text: string){
    this.customService.getSearchedCities(text).subscribe(cities =>{
      this.cityList = cities;
      console.log(">cities::>", this.cityList);
    });
  }

  selectRto(value: any){
    console.log(">>>>rto selection::", value);
    this.listRTO.forEach((element: { region_code: any; registered_state_name: any; registered_city_name: any; }) => {
      console.log(element);
      if(value != "" && element.region_code === value){
        console.log('matched::',element);
        this.motorInfoForm.controls['state'].setValue(element.registered_state_name);
        this.motorInfoForm.controls['city'].setValue(element.registered_city_name);
        return;
      }
    });
  }

  makersearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(maketerm => this.listMaker)
    )
  formattermaker = (x: { Make: string }) => x.Make.trim();
  // tslint:disable-next-line: typedef
  getSearchedMakers(termMaker: string) {
    console.log('Vtype:::::', this.motorType);
    this.customService.getSearchedmaker(termMaker, this.motorType).subscribe(dataMaker => {
      this.listMaker = [];
      this.listMaker = dataMaker;
      //this.listMaker = JSON.parse(this.listMaker);
      console.log(">vehicle maker::>", this.listMaker);
    });
    this.getSerchedModel(termMaker);
  }

  getSerchedModel(searchText: string){
    this.customService.getTmpSearchedModel(searchText, this.motorType).subscribe(model=>{
      this.modelList = [];
      this.modelList = model;
      console.log('model:', this.modelList);
    });
  }

  getSearchedVariants(searchText: string, model: string){
    this.customService.getTmpSearchedVariants(searchText, model).subscribe(variant => { 
      this.fversionList = [];
      console.log('variant:',variant);
      this.fversionList = variant;
    });
  }

  getSerchedFuelTypes(maker: string, model: string, variant: string){
    this.customService.getTmpSearchedFueltypes(maker, model, variant).subscribe(fuel=>{
      this.fuelList = [];
      console.log('fuel::', fuel);
      this.fuelList = fuel;
    });
  }

  onViewPlanClick() {
    //debugger;
    //this.submitted = true;
    console.log("validate::", this.motorInfoForm.invalid);
    console.log("validate:no:", this.motorInfoForm.controls['vehicleNo'].value);
    if (this.motorInfoForm.get('vehicleNo').value === "") {
      //this.submitted = false;
      return false;
    }
    else {
      $('#form-viewPlans').hide();
      $('#rto-section').show();
      this.userVehicleDetails.rtoRegistrationNo = this.motorInfoForm.get('vehicleNo').value;
    }
  }

  private bindallState() {
    this.loading = true;
    this.customService.getallstates().subscribe(stateData => {
      this.stateList = stateData;
      //this.stateList = JSON.parse(this.stateList);
      console.log("bindallState:", this.stateList);
    })
  }

  // tslint:disable-next-line: typedef
  selectedMakerItem(item: { item: { Make: string; }; }) {
    this.strMaker = item.item.Make;
    this.setselectedmakerdata();
  }

  selectedItem(item: { item: { region_code: string; }; }) {
    console.log("selectedItem:", item);
    this.strRTO = item.item.region_code;
    this.setselectedrtodata();
  }

  private setselectedrtodata() {
    this.loading = true;
    this.customService.getselectedrtodata(this.strRTO).subscribe(rtoData => {
      console.log("rtooo:", rtoData);
      this.rtoDetails = rtoData;
      this.rtoDetails = JSON.parse(this.rtoDetails);
      console.log("rto1:", this.rtoDetails[0].registered_state_name);

      this.bindCity(this.rtoDetails[0].registered_state_name);
      this.bindRTO(this.rtoDetails[0].registered_city_name);
      this.motorInfoForm.controls['state'].setValue(this.rtoDetails[0].registered_state_name);
      this.motorInfoForm.controls['city'].setValue(this.rtoDetails[0].registered_city_name);
      this.motorInfoForm.controls['rto'].setValue(this.strRTO);
      console.log("setselectedrtodata::", this.rtoDetails);
    })

  }

  private setselectedmakerdata() {
    this.loading = true;

    this.customService.getselectedmakerdata(this.strMaker).subscribe(makerData => {
      this.makerDetails = makerData;
      this.makerDetails = JSON.parse(this.makerDetails);

      this.bindModel(this.makerDetails[0].Make);
      this.bindFuelVersion(this.makerDetails[0].Model);
      this.motorInfoForm.controls['maker'].setValue(this.makerDetails[0].Make);
      this.motorInfoForm.controls['model'].setValue(this.makerDetails[0].Model);
      this.motorInfoForm.controls['fueltype'].setValue(this.makerDetails[0].Fuel_Type);
    })
  }
  // tslint:disable-next-line: typedef
  cityChange(cityObj: any) {
    const cityVal = cityObj;
    if (cityVal === '') {
      this.alertService.warn('Please select city.', { keepAfterRouteChange: false });
      return;
    }
    else {
      this.bindRTO(cityVal);
      this.motorInfoForm.controls['rto'].setValue("0");
    }
  }

  public validateRTOfields() {
    let isErr = false;
    if (this.motorInfoForm.controls['state'].value === '0'
      || this.motorInfoForm.controls['city'].value === '0'
      || this.motorInfoForm.controls['rto'].value === '0') {
      isErr = true;
    }

    if (isErr) {
      $('#errSpan').show();
      return false;
    }
    else {
      $('#errSpan').hide();
      $('#rto-section').hide();
      $('#cars-section').show();
      this.userVehicleDetails.vehicleType = this.motorType;
      this.userVehicleDetails.rtoCode = this.motorInfoForm.controls['rto'].value;
      this.userVehicleDetails.state = this.motorInfoForm.controls['state'].value;
      this.userVehicleDetails.city = this.motorInfoForm.controls['city'].value;

    }
  }
  public validateVehiclefields() {
    let isErr = false;

    if (this.motorInfoForm.controls['maker'].value === '0'
      || this.motorInfoForm.controls['model'].value === '0'
      || this.motorInfoForm.controls['fueltype'].value === '0') {
      isErr = true;
    }

    if (isErr) {
      $('#errVehicleSpan').show();
      return false;
    }
    else {
      $('#errVehicleSpan').hide();
      $('#cars-section').hide();
      $('#user-section').show();
      this.userVehicleDetails.vehicleMenufacturer = this.motorInfoForm.controls['maker'].value;
      this.userVehicleDetails.vehicleModel = this.motorInfoForm.controls['model'].value;
      this.userVehicleDetails.vehicleVariant = this.motorInfoForm.controls['variant'].value;
      this.userVehicleDetails.fuelType = this.motorInfoForm.controls['fueltype'].value;
      this.userVehicleDetails.year = this.motorInfoForm.controls['year'].value;
    }
  }

  private bindRTO(cityPrmVal: any) {
    this.loading = true;
    this.customService.getFilteredRTO(cityPrmVal).subscribe(rtoData => {
      this.rtoList = rtoData;
      this.rtoList = JSON.parse(this.rtoList);
    })
  }

  stateChange(stateVal: any) {
    if (stateVal === '0') {
      this.alertService.warn('Please select state.', { keepAfterRouteChange: false });
      return;
    }
    else {
      this.bindCity(stateVal);
      this.motorInfoForm.controls['city'].setValue("0");
    }
  }

  private bindCity(statePrmVal: any) {
    this.loading = true;
    this.customService.getFilteredCities(statePrmVal).subscribe(cityData => {
      this.cityList = cityData;
      this.cityList = JSON.parse(this.cityList);

    })
  }

  private bindallMakers() {
    this.loading = true;
    this.customService.getallmakers().subscribe(makersData => {
      this.makersList = makersData;
      this.makersList = JSON.parse(this.makersList);
    })

  }

  makerChange(makerVal: any) {
    console.log('makerchngs:', makerVal);
    if (makerVal === '0') {
      this.alertService.warn('Please select car maker.', { keepAfterRouteChange: false });
      return;
    }
    else {
      //this.bindModel(makerVal);
      this.motorInfoForm.controls['model'].setValue(0);
    }
  }

  bindModel(makerPrmVal: string) {
    this.loading = true;
    this.customService.getFilteredmodels(makerPrmVal).subscribe(modelData => {
      this.modelList = modelData;
      //this.modelList = JSON.parse(this.modelList);
      console.log('models:::', this.modelList);
    })
  }

  modelChange(modelVal: any) {
    this.getSearchedVariants(this.motorInfoForm.controls['maker'].value, this.motorInfoForm.controls['model'].value);
    if (modelVal === '0') {
      this.alertService.warn('Please select car model.', { keepAfterRouteChange: false });
      return;
    }
    else {
      //this.bindFuelVersion(modelVal);
      this.motorInfoForm.controls['fueltype'].setValue(0);
    }
  }

  variantChange(value: string){
    let val:string = value;
    console.log('varnt:',  (value.split('-')[0]).trim());
    this.getSerchedFuelTypes(this.motorInfoForm.controls['maker'].value, 
                this.motorInfoForm.controls['model'].value, (value.split('-')[0]).trim());
  }

  bindFuelVersion(modelPrmVal: string) {
    this.loading = true;
    this.customService.getFilteredFuelVersions(modelPrmVal).subscribe(fuelversionData => {
      this.fversionList = fuelversionData;
      this.fversionList = JSON.parse(this.fversionList);

    })
  }

  initializeVehicleDetails(){
    //this.vehicleDetails.
  }

  public ngOnDestroy(): void {
  }

}

export enum FuelTypesEnum {
  PETROL = "Petrol",
  DIESEL = "Diesel",
  ELECTRIC = "Electric",
}
export class NgbdModalBasic {
  closeResult = '';

 

  

 
}