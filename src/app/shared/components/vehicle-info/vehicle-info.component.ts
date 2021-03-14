
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidation } from '@app/_helpers';
import { AlertService, AgentposService, CacheService, CustomService } from '@app/_services';
import { FormsModule } from '@angular/forms';
import { state } from '@angular/animations';
declare var $: any;

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html'
})
export class VehicleInfoComponent implements OnInit {
  _session: Object;
  venqForm: FormGroup;
  loading = false;
  submitted = false;
  cacheService = CacheService;
  citiesList: any = [];
  stateList: any = [];
  cityList: any = [];
  rtoList: any = [];
  clickedItem: string;
  public model: any;
  setState: any;
  listRTO: any = [];
  stateSelect = '0';
  citySelect = '0';
  rtoSelect = '0';
  strRTO: string;
  rtoDetails: any = [];
  listMaker: any = [];
  makersList: any = [];
  makerSelect = "0";
  modelList: any = [];
  modelSelect = "0";
  fversionList: any = [];
  fueltypeSelect = "0";
  makerDetails: any = [];
  strMaker: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private customService: CustomService,
    private customValidator: CustomValidation) { }

  ngOnInit(): void {
    this.venqForm = this.formBuilder.group({
      carnum: ['', [Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$')]],
      userfullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z\\s]*$')]],
      useremail: ['', [Validators.required, Validators.email], [this.customValidator.validateEmailNotTaken.bind(this.customValidator)]],
      usermobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")], [this.customValidator.validateMobileNotTaken.bind(this.customValidator)]],
      state: ['0'],
      city: ['0'],
      rto: ['0'],
      maker: ['0'],
      model: ['0'],
      fueltype: ['0']
    });

    this.bindallState();
    this.bindallMakers();
    $('#btn-proceedwithoutNum').add('#btn-proceednewcar').on('click', function () {
      $('#rto-section').show();
      $('#form-viewPlans').hide();
    });
    //cache part
    if (sessionStorage.getItem("userinfo")) {
      this.venqForm.setValue(JSON.parse(sessionStorage.getItem("userinfo")));
    }
  }

  
  get f() {
    return this.venqForm.controls;
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
    this.customService.getSearchedrtos(termRTO).subscribe(dataRTO => {
      this.listRTO = dataRTO;
      this.listRTO = JSON.parse(this.listRTO);
    })
  }



  makersearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(maketerm => this.listMaker)
    )
  formattermaker = (x: { Make: string }) => x.Make.trim();
  // tslint:disable-next-line: typedef
  getSearchedMakers(termMaker: string) {
    this.customService.getSearchedmaker(termMaker, '').subscribe(dataMaker => {
      this.listMaker = dataMaker;
      this.listMaker = JSON.parse(this.listMaker);

    })
  }
  onRtoSubmit() {
    
    this.submitted = true;

    if (this.venqForm.get('carnum').value === "") {
      return false;
    }
    // if (this.venqForm.invalid) {
    //   return false;
    // }
    else {
      $('#form-viewPlans').hide();
      $('#rto-section').show();
    }
  }

  private bindallState() {
    this.loading = true;
    this.customService.getallstates().subscribe(stateData => {
      this.stateList = stateData;
      this.stateList = JSON.parse(this.stateList);

    })
  }

  // tslint:disable-next-line: typedef
  selectedMakerItem(item) {
    this.strMaker = item.item.Make;
    this.setselectedmakerdata();
  }

  selectedItem(item) {
    this.strRTO = item.item.region_code;
    this.setselectedrtodata();
  }

  private setselectedrtodata() {
    this.loading = true;
    this.customService.getselectedrtodata(this.strRTO).subscribe(rtoData => {
      this.rtoDetails = rtoData;
      this.rtoDetails = JSON.parse(this.rtoDetails);
      this.stateSelect = this.rtoDetails[0].registered_state_name;
      this.bindCity(this.rtoDetails[0].registered_state_name);
      this.citySelect = this.rtoDetails[0].registered_city_name;
      this.bindRTO(this.rtoDetails[0].registered_city_name);
      this.rtoSelect = this.strRTO;
    })
  }

  private setselectedmakerdata() {
    this.loading = true;

    this.customService.getselectedmakerdata(this.strMaker).subscribe(makerData => {
      this.makerDetails = makerData;
      this.makerDetails = JSON.parse(this.makerDetails);
    
      this.makerSelect = this.makerDetails[0].Make;
      this.bindModel(this.makerDetails[0].Make);
      this.modelSelect = this.makerDetails[0].Model;
      this.bindFuelVersion(this.makerDetails[0].Model);
      this.fueltypeSelect = this.makerDetails[0].Fuel_Type;
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
      this.rtoSelect = "0";
    }
  }
  // Field Validation
  gotolisting() {
    this.submitted = true;
    this.loading = true;
    if (this.venqForm.invalid) {
      return false;
    }
    
   
    this._session = this.venqForm.value;
    sessionStorage.setItem("userinfo", JSON.stringify(this.venqForm.value));
    this.router.navigate(['motor-insurance/quotes']);
  }

  public validateRTOfields() {
    // tslint:disable-next-line: prefer-const
    let isErr = false;
    if ($('#state').val() === '0') {
      isErr = true;
    }
    if ($('#city').val() === '0') {
      isErr = true;
    }
    if ($('#rto').val() === '0') {
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
    }
  }
  public validateVehiclefields() {
    // tslint:disable-next-line: prefer-const
    let isErr = false;
    if ($('#maker').val() === '0') {
      isErr = true;
    }
    if ($('#model').val() === '0') {
      isErr = true;
    }
    if ($('#fueltype').val() === '0') {
      isErr = true;
    }
    if (isErr) {

      $('#errVehicleSpan').show();
      return false;
    }
    else {
      $('#errVehicleSpan').hide();
      $('#cars-section').hide();
      $('#user-section').show(); 5
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
      this.citySelect = "0";
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
    if (makerVal === '0') {
      this.alertService.warn('Please select car maker.', { keepAfterRouteChange: false });
      return;
    }
    else {
      this.bindModel(makerVal);
      this.modelSelect = "0";
    }
  }

  bindModel(makerPrmVal: string) {
    this.loading = true;
    this.customService.getFilteredmodels(makerPrmVal).subscribe(modelData => {
      this.modelList = modelData;
      this.modelList = JSON.parse(this.modelList);

    })
  }

  modelChange(modelVal: any) {
    if (modelVal === '0') {
      this.alertService.warn('Please select car model.', { keepAfterRouteChange: false });
      return;
    }
    else {
      this.bindFuelVersion(modelVal);
      this.fueltypeSelect = "0";
    }
  }

  bindFuelVersion(modelPrmVal: string) {
    this.loading = true;
    this.customService.getFilteredFuelVersions(modelPrmVal).subscribe(fuelversionData => {
      this.fversionList = fuelversionData;
      this.fversionList = JSON.parse(this.fversionList);

    })
  }

  public ngOnDestroy(): void {

  }

}
