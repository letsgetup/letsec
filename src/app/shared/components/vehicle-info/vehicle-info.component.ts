
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

  loading = false;
  submitted = false;
  cacheService = CacheService;
  citiesList: any = [];
  stateList: any = [];
  cityList: any = [];
  rtoList: any = [];
  clickedItem: string;
  public model: any;
  setState : any;

  // City Search
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => this.citiesList)
    )


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agentposService: AgentposService,
    private alertService: AlertService,
    private customService: CustomService) { }

  formatter = (x: { city: string }) => x.city;
  // tslint:disable-next-line: typedef
  getCityonKeyPress(distterm: string) {
    this.customService.getallcities(distterm).subscribe(distData => {
      this.citiesList = distData;
      console.log(this.citiesList);
      this.citiesList = JSON.parse(this.citiesList);

    })
  }


  ngOnInit(): void {
    this.bindState();
   
    $('#btn-viewplans').add('#btn-proceedwithoutNum').add('#btn-proceednewcar').on('click', function () {
      $('#rto-section').show();
      $('#form-viewPlans').hide();
    });

    $('#cars-btn-section').click(function () {
      $('#user-section').show();
      $('#cars-section').hide();
    })
  }
  selectedItem(item) {
    debugger;
    this.clickedItem = item.item.District;
    this.setState = "12";
  }

  // State dropdown binding
  private bindState() {
    this.loading = true;
    this.customService.getallstates().subscribe(stateData => {
      this.stateList = stateData;
      this.stateList = JSON.parse(this.stateList);

    })
  }

  // tslint:disable-next-line: typedef
  private bindCity(statePrmVal: any) {
    this.loading = true;
    this.customService.getFilteredCities(statePrmVal).subscribe(cityData => {
      this.cityList = cityData;
      this.cityList = JSON.parse(this.cityList);
    })
  }
  // tslint:disable-next-line: typedef
  private bindRTO(cityPrmVal: any) {
    this.loading = true;
    this.customService.getFilteredRTO(cityPrmVal).subscribe(rtoData => {
      this.rtoList = rtoData;
      this.rtoList = JSON.parse(this.rtoList);
    })
  }

  public BindAllfields() {
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



  // Get selected values
  // tslint:disable-next-line: typedef
  stateChange(stateVal: any) {
    if (stateVal === '0') {
      this.alertService.warn('Please select state.', { keepAfterRouteChange: false });
      return;
    }
    else {
      this.bindCity(stateVal);
    }
  }

  // tslint:disable-next-line: typedef
  cityChange(cityObj: any) {
    const cityVal = cityObj.currentTarget.options[cityObj.currentTarget.options.selectedIndex].text;
    if (cityVal === '') {
      this.alertService.warn('Please select city.', { keepAfterRouteChange: false });
      return;
    }
    else {
      this.bindRTO(cityVal);
    }
  }
  gotolisting()
  {
 
    this.router.navigate(['motor-insurance/car-insurance/listing']);
  }
  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void { }

}
