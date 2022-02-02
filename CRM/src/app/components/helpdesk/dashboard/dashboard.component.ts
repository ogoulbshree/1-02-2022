import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model: any = {
    fromDate: "",
    toDate: ""
  };
  filter: any = {
    from: 0,
    to: 0,
  };
  constructor() { }

  ngOnInit() {
  }

}
