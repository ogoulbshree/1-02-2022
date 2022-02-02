import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliernameDetail } from 'src/app/models/SuppliernameDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

import { formatDate } from "@angular/common";
import { of } from "rxjs";


@Component({
  selector: 'app-suppliername',
  templateUrl: './suppliername.component.html',
  styleUrls: ['./suppliername.component.css']
})
export class SuppliernameComponent extends DynamicComponent implements OnInit {


  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector,  @Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) {
    
      super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SUPPLIER,injector);
     }
   
  isUpdate = false;

  suppliernameDetail : SuppliernameDetail;
  filteredTableDataArr: any;
  suppliernameDataArr = [];
  

  async ngOnInit() {
   
    await this.populateFields();
    this.suppliernameDetail = new SuppliernameDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let supplier_id = params["id"];
        if (supplier_id) {
          let result = await this._dbService.getSuppliername(supplier_id).toPromise();
          //console.log(result);
          this.suppliernameDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.departmentDetail);
  
  this.suppliernameDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.suppliernameDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateSuppliername(this.suppliernameDetail).toPromise();
    }
else{
this.suppliernameDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.suppliernameDetail.created_time = Date.now();
result = await this._dbService.addSuppliername(this.suppliernameDetail).toPromise();
}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("SuppliernameDetail Added Successfully");
else
    CustomMisc.showAlert("SuppliernameDetail Updated Successfully");
this._router.navigate(["sales/settings/dynamicsettings/suppliernamelist"]);

this.showError = "";
 
} 

catch (error) {
  /* CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
  CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
  CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
  CustomLogger.logError(error.message);
   */
  CustomMisc.showAlert(error.error.message, true);
  this.showError = error.error.message;
}  
  
}


}