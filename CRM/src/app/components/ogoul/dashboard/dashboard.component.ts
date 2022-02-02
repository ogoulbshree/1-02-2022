import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  totalcontactedusers =0;
  totalrequesteddemo =0;
  totalusers = 0;
  totaltickets = 0;
  totalsurvey = 0;
  email: any;
  constructor(private _dbService: DBService,    private _uiService: UiService,) { }


  
  async ngOnInit() {

  

    
    let result = await this._dbService.dashboardSearch().toPromise();
   // console.log("DASH RESH....:", result["data"]);
    let dashObj = result["data"];
    this.totalcontactedusers = dashObj.totalcontactedusers;
    this.totalusers = dashObj.totalusers;
    this.totalrequesteddemo =dashObj.totalrequesteddemo;
    this.totaltickets = dashObj.totaltickets;
    this.totalsurvey = dashObj.totalsurvey;

    setTimeout(() => { }, 1);
  }

}
