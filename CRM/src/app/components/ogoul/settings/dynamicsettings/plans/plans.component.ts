import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansDetail } from 'src/app/models/PlansDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  

  constructor(@Inject(LOCALE_ID) public locale: string,private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;

  plansDetail : PlansDetail;
  filteredTableDataArr: any;
  plansDataArr = [];
  

  async ngOnInit() {
  
    this.plansDetail = new PlansDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let plan_id = params["id"];
        if (plan_id) {
          let result = await this._dbService.getPlans(plan_id).toPromise();
         // console.log(result);
          this.plansDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
onClickForm(){
  
}
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save source...", this.sourceDetail);
  
  this.plansDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.plansDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updatePlans(this.plansDetail).toPromise();
    }
else{
this.plansDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.plansDetail.created_time = Date.now();
result = await this._dbService.addPlans(this.plansDetail).toPromise();
}
//CustomLogger.logStringWithObject("addSource:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addPlans Added Successfully");
else
    CustomMisc.showAlert("addPlans Updated Successfully");
this._router.navigate(["ogoul/settings/dynamicsettings/planslist"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in addPlans : " + error.message, true);
}    }


}