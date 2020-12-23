import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, CustomService } from '@app/_services';
declare var $: any;

@Component({
  selector: 'app-two-wheeler-filter',
  templateUrl: './two-wheeler-filter.component.html'
})
export class TwoWheelerFilterComponent implements OnInit {
  masterbikeMakers: any =[]; 
  masterbikeModels: any =[];
  masterbikeVariant:any =[];
  masterYear:any =[];
  priviousYears = 15;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService,
      private customService: CustomService
  ) { }

  ngOnInit(): void {
    $('#btn-viewplans').add('#btn-proceedwithoutNum').add('#btn-proceednewcar').on('click', function () {
      $('#form-viewPlans').hide();
      $('#cars-section').show();
    });

    this.getllBikeMake();
    this.generateArrayOfYears();

  }
  
  getllBikeMake() {
      this.customService.getAllBikeMake().subscribe(bikeMaker => {
        //console.log(bikeMaker)
        this.masterbikeMakers =bikeMaker;
        this.masterbikeMakers = JSON.parse(this.masterbikeMakers);
      })
  }

  getbikeModel(bikeMaker : string) {
    this.customService.getAllBikeModel(bikeMaker).subscribe(bikeModel => {
      //console.log(bikeMaker)
      this.masterbikeModels =bikeModel;
      this.masterbikeModels = JSON.parse(this.masterbikeModels);
    })
  }

  getbikeVariant(bikeModel : string) {
    this.customService.getAllBikeVariant(bikeModel).subscribe(bikeVariant => {
      console.log(bikeVariant)
      this.masterbikeVariant =bikeVariant;
      this.masterbikeVariant = JSON.parse(this.masterbikeVariant);
    })
  }

  generateArrayOfYears() {
  var max = new Date().getFullYear()
  var min = max - this.priviousYears
  
    for (var i = max; i >= min; i--) {
      this.masterYear.push(i)
    }
  }
  gotoListing() {
        /* console.log($("#tw_bike_num").val()); console.log($("#tw_bike_mk").val());
        console.log($("#tw_bike_model").val()); console.log($("#tw_vari_vers").val());
        console.log($("#tw_reg_dt").val());
        */
      var tw_bike_num =  $("#tw_bike_num").val().trim();
      var tw_bike_mk = $("#tw_bike_mk").val().trim();
      var tw_bike_model = $("#tw_bike_model").val().trim();
      var tw_vari_vers = $("#tw_vari_vers").val().trim();
      var tw_reg_dt = $("#tw_reg_dt").val().trim();
      

        sessionStorage.setItem("2_wh_flt_val", 
            JSON.stringify({
                  "tw_bike_num":tw_bike_num,
                  "tw_bike_mk":tw_bike_mk,
                  "tw_bike_model":tw_bike_model,
                  "tw_vari_vers":tw_vari_vers,
                  "tw_reg_dt":tw_reg_dt
                  })
                )
                console.log("Bike number" + tw_bike_num)
        if(tw_bike_num != "undefined" &&  tw_bike_num !="") {
            this.router.navigate(['motor-insurance/two-wheeler-insurance/listing']);
        }

        return false;
  }
}
