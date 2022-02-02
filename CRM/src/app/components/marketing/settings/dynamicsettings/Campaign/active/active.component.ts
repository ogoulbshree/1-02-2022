import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveDetails } from 'src/app/models/ActiveDetails.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent extends DynamicComponent implements OnInit{

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService, @Inject(LOCALE_ID) public locale: string,) {

    super(GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_ACTIVE,injector);
   }
  isUpdate = false;

  activeDetail : ActiveDetails;
  filteredTableDataArr: any;
  activeDetailDataArr = [];
  

  async ngOnInit() {
    await this.populateFields();
  
    this.activeDetail = new ActiveDetails();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let active_id = params["id"];
        if (active_id) {
          let result = await this._dbService.getCampaignactive(active_id).toPromise();
         // console.log(result);
          this.activeDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save active...", this.activeDetail);
  
  this.activeDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.activeDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateCampaignactive(this.activeDetail).toPromise();
    }
else{
this.activeDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.activeDetail.created_time = Date.now();
result = await this._dbService.addCampaignactive(this.activeDetail).toPromise();
}
//CustomLogger.logStringWithObject("addCampaignactive:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addCampaignactive Added Successfully");
else
    CustomMisc.showAlert("addCampaignactive Updated Successfully");
this._router.navigate(["marketing/settings/dynamicsettings/Campaign/activelist"]);


this.showError = "";
 
} 

catch (error) {
/*   CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
  CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
  CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
  CustomLogger.logError(error.message); */
  CustomMisc.showAlert(error.error.message, true);
  this.showError = error.error.message;
}  
  
}

onClickForm() {
  this.activeDetail.active = "";
}
}