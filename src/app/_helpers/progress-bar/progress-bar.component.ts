import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less']
})
export class ProgressBarComponent implements OnInit {
  show = false;

  constructor() { }

  ngOnInit(): void {
  }

  showProgressBar(show: boolean){
    this.show = show;
  }

}
