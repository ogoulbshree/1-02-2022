import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadsourceDetail } from 'src/app/models/LeadsourceDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-leadsource',
  templateUrl: './leadsource.component.html',
  styleUrls: ['./leadsource.component.css']
})
export class LeadsourceComponent  extends DynamicComponent implements OnInit {

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  
  constructor( private _router: Router, @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice: UiService) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_LEAD_SOURCE,injector);
   }

  isUpdate = false;

  leadsourceDetail : LeadsourceDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];
  

  async ngOnInit() {
  
    await this.populateFields();
    this.leadsourceDetail = new LeadsourceDetail();

    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let lead_source_id = params["id"];
        if (lead_source_id) {
          let result = await this._dbService.getLeadsource(lead_source_id).toPromise();
         // console.log(result);
          this.leadsourceDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
   
showError = "";
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save lead source...", this.leadsourceDetail);
  this.leadsourceDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
   /* 
    this.productDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.leadsourceDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateLeadsource(this.leadsourceDetail).toPromise();
    }
else{
this.leadsourceDetail.created_by= this._dbService.getCurrentUserDetail().email;
/*  this.productDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
 this.leadsourceDetail.created_time = Date.now();
result = await this._dbService.addLeadsource(this.leadsourceDetail).toPromise();
}
//CustomLogger.logStringWithObject("added lead source :result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("lead source Added Successfully");
else
    CustomMisc.showAlert("lead source  Updated Successfully");
this._router.navigate(["sales/settings/dynamicsettings/leadsourcelist"]);

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

/* onClickForm() {
  this.categoryDetail.category_name = "";
  
} */
}
