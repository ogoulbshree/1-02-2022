import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaigntypeDetail } from 'src/app/models/CampaigntypeDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 

@Component({
  selector: 'app-campaigntype',
  templateUrl: './campaigntype.component.html',
  styleUrls: ['./campaigntype.component.css']
})
export class CampaigntypeComponent extends DynamicComponent implements OnInit {

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  
  constructor( private _router: Router, @Inject(LOCALE_ID) public locale: string, private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) {
    super(GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_TYPE,injector);
   }
  isUpdate = false;

  campaigntypeDetail : CampaigntypeDetail;
  filteredTableDataArr: any;
  campaigntypeDataArr = [];
  

  async ngOnInit() {
    await this.populateFields();
    this.campaigntypeDetail = new CampaigntypeDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let campaign_type_id = params["id"];
        if (campaign_type_id) {
          let result = await this._dbService.getCampaigntype(campaign_type_id).toPromise();
          //console.log(result);
          this.campaigntypeDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.campaigntypeDetail);
  
  this.campaigntypeDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.campaigntypeDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateCampaigntype(this.campaigntypeDetail).toPromise();
    }
else{
this.campaigntypeDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.campaigntypeDetail.created_time = Date.now();
result = await this._dbService.addCampaigntype(this.campaigntypeDetail).toPromise();
}
//CustomLogger.logStringWithObject("addCampaign Type:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addCampaign Type Added Successfully");
else
    CustomMisc.showAlert("addCampaign Type Updated Successfully");
this._router.navigate(["marketing/settings/dynamicsettings/Campaign/campaigntypelist"]);


this.showError = "";
 
} 

catch (error) {
  /* CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
  CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
  CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
  CustomLogger.logError(error.message); */
  CustomMisc.showAlert(error.error.message, true);
  this.showError = error.error.message;
}  
  
}

onClickForm() {
  this.campaigntypeDetail.campaign_type_name = "";
}
}