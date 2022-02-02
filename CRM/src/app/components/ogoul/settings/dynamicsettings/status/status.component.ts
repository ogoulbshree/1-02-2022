import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusDetail } from 'src/app/models/StatusDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {


  constructor(@Inject(LOCALE_ID) public locale: string,private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;

  statusDetail : StatusDetail;
  filteredTableDataArr: any;
  statusDataArr = [];
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  

  async ngOnInit() {
  
    this.statusDetail = new StatusDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let status_id = params["id"];
        if (status_id) {
          let result = await this._dbService.getStatus(status_id).toPromise();
         // console.log(result);
          this.statusDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
   
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save source...", this.statusDetail);
  
  this.statusDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.statusDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateStatus(this.statusDetail).toPromise();
    }
else{
this.statusDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.statusDetail.created_time = Date.now();
result = await this._dbService.addStatus(this.statusDetail).toPromise();
}
//CustomLogger.logStringWithObject("addStatus:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addStatus Added Successfully");
else
    CustomMisc.showAlert("addStatus Updated Successfully");
this._router.navigate(["ogoul/settings/dynamicsettings/statuslist"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in addSource : " + error.message, true);
}    }

onClickForm() {
  this.statusDetail.status = "";
}
}