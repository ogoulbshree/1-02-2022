import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignstatusDetail } from 'src/app/models/CampaignstatusDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 
@Component({
  selector: 'app-campaignstatus',
  templateUrl: './campaignstatus.component.html',
  styleUrls: ['./campaignstatus.component.css']
})
export class CampaignstatusComponent implements OnInit {

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));


  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,
    public _uiservice: UiService,  @Inject(LOCALE_ID) public locale: string) { }
  isUpdate = false;
  
  p:number = 1;
  reverse:boolean = false;
  key:string = 'id';
  campaignstatusDetail : CampaignstatusDetail;
  filteredTableDataArr: any;
  campaignstatusDataArr = [];
  

  async ngOnInit() {
  
    this.campaignstatusDetail = new CampaignstatusDetail();

    this._activatedRoute.params.subscribe(
      async params => {
     //   console.log("params:", params);
        let campaign_status_id = params["id"];
        if (campaign_status_id) {
          let result = await this._dbService.getCampaignstatus(campaign_status_id).toPromise();
          //console.log(result);
          this.campaignstatusDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
   
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save campaignstatus...", this.campaignstatusDetail);
  
  this.campaignstatusDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.campaignstatusDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateCampaignstatus(this.campaignstatusDetail).toPromise();
    }
else{
this.campaignstatusDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.campaignstatusDetail.created_time = Date.now();
result = await this._dbService.addCampaignstatus(this.campaignstatusDetail).toPromise();
}
//CustomLogger.logStringWithObject("addCampaign:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addCampaign Added Successfully");
else
    CustomMisc.showAlert("addCampaign Updated Successfully");
this._router.navigate(["marketing/settings/dynamicsettings/Campaign/campaignstatuslist"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in addDepartmment : " + error.message, true);
}    }

onClickForm() {
  this.campaignstatusDetail.campaign_status = "";
}
}