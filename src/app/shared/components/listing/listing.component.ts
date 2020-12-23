import { Component, OnDestroy, OnInit } from '@angular/core';
import { TwoWheelerListingService } from '@app/_services';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnInit, OnDestroy {
  vehicalDetail: any =[]; 
  _wh_details: any =[];
  _All_QUOATE_LIST :any=[];
  constructor(
      private twoWheelerListingService : TwoWheelerListingService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("2_wh_flt_val") != null) {
      this._wh_details = JSON.parse(sessionStorage.getItem("2_wh_flt_val"));
      this.vehicalDetail = { 
         "vh_no" : this._wh_details.tw_bike_num,
				"vh_make" :  this._wh_details.tw_bike_mk  ,
				"vh_model" : this._wh_details.tw_bike_model ,
				"vh_varient" : this._wh_details.tw_vari_vers,
				"vh_regis_dt" : this._wh_details.tw_reg_dt 
				}
      this.twoWheelerListingService.getAllBikeQuoteListDi(this.vehicalDetail)
      .subscribe(
          digitBikelist =>{
            this._All_QUOATE_LIST=digitBikelist;
            this._All_QUOATE_LIST = JSON.parse(this._All_QUOATE_LIST);
          }
      )
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem("2_wh_flt_val");
  }
}
