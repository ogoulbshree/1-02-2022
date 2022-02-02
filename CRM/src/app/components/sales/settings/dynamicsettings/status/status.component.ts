import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesstatusDetail } from 'src/app/models/Salesstatus.model';
import { StatusDetail } from 'src/app/models/StatusDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {


  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,  @Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) { }
  isUpdate = false;

  statusDetail : SalesstatusDetail;
  filteredTableDataArr: any;
  statusDataArr = [];
  

  async ngOnInit() {
  
    this.statusDetail = new SalesstatusDetail();

    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let status_id = params["id"];
        if (status_id) {
          let result = await this._dbService.getsalesStatus(status_id).toPromise();
         // console.log(result);
          this.statusDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
   
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save status...", this.statusDetail);
  
  this.statusDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.statusDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updatesalesStatus(this.statusDetail).toPromise();
    }
else{
this.statusDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.statusDetail.created_time = Date.now();
result = await this._dbService.addsalesStatus(this.statusDetail).toPromise();
}
//CustomLogger.logStringWithObject("addsalesStatus:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addsalesStatus Added Successfully");
else
    CustomMisc.showAlert("addsalesStatus Updated Successfully");
this._router.navigate(["sales/settings/dynamicsettings/statuslist"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in status : " + error.message, true);
}    }

onClickForm() {
  this.statusDetail.status = "";
}
}