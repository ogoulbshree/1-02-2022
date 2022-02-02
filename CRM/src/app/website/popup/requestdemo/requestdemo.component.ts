import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequesteddemoDetail } from 'src/app/models/Requesteddemo.model';
import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { NgModule } from '@angular/core';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { PlansDetail } from 'src/app/models/PlansDetail.model';
@Component({
  selector: 'app-requestdemo',
  templateUrl: './requestdemo.component.html',
  styleUrls: ['./requestdemo.component.css']
})
export class RequestdemoComponent extends DynamicComponent implements OnInit {

  
requestdemoDetail: RequesteddemoDetail
isUpdate = false;
 

plansDetail: PlansDetail[] =[];
 
_modalRef: NgbModalRef;
  constructor(  private _router: Router,injector: Injector, public _uiservice: UiService,private _activatedRoute: ActivatedRoute,public activeModal: NgbActiveModal) {
    super(GlobalConstants.CRM_LANDING_PAGE.HOMEPAGE, injector);
   }

   async htmlInit() {
    
    let result = await this._dbService.getAllPlans(1).toPromise();
    this.plansDetail = result["results"];



/* {let res = await this._dbService.getAllnotes().toPromise();
this.notes = res["data"];
}  */ 

  }

catch (error) {
  CustomLogger.logStringWithObject("ERROR:", error);
}


  async ngOnInit() {
    await this.htmlInit();
    await this.populateFields();
    

    this.requestdemoDetail = new RequesteddemoDetail();

 this._activatedRoute.params.subscribe(
   async params => {
   //  console.log("params:", params);
     let Requested_demo_id = params["id"];
     if (Requested_demo_id) {
       let result = await this._dbService.getDemodetails(Requested_demo_id).toPromise();
      // console.log(result);
       this.requestdemoDetail = result["data"];
       this.isUpdate = true;
     }

   }
 );
  }
  
async onSubmitDemo() {
// CustomLogger.logStringWithObject("Will save demo register...", this.requestdemoDetail);
try {
   let res = null;
   if (this.isUpdate){
   res = await this._dbService.updateDemodetails(this.requestdemoDetail).toPromise();
   }
else{
res = await this._dbService.addDemodetails(this.requestdemoDetail).toPromise();

}
//CustomLogger.logStringWithObject("adddemo:result:", res);
if (!this.isUpdate)
   CustomMisc.showAlert("contacted demo Added Successfully");
else
   CustomMisc.showAlert(" contacted demo Updated Successfully");
this._router.navigate(["/ogoul/requesteddemo"]);

} 
catch (error) {
CustomLogger.logError(error);
CustomMisc.showAlert("Error in demo contacted in Users: " + error.message, true);
}    
this.activeModal.dismiss();
this.activeModal.close();

}


}

