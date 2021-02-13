import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html'
})
export class ThirdPartyComponent implements OnInit {
  inputField: string = "Third Party Insurance";
  insuranceType: string = "3rdParty";
  constructor() { }

  ngOnInit(): void {
  }

}
