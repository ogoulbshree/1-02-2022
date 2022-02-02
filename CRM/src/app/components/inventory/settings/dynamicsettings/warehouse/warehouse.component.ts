import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { WarehouseDetail } from 'src/app/models/WarehouseDetail.model';
import { formatDate } from "@angular/common";

import { of } from "rxjs";
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends DynamicComponent implements OnInit {

  

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor( 
    public _uiservice: UiService,private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,@Inject(LOCALE_ID) public locale: string,) { 
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_WAREHOUSE,injector);
  }
  isUpdate = false;

  warehouseDetail : WarehouseDetail;
  filteredTableDataArr: any;
  warehouseDataArr = [];
  

  async ngOnInit() {
  
    await this.populateFields();
    this.warehouseDetail = new WarehouseDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let warehouse_id = params["id"];
        if (warehouse_id) {
          let result = await this._dbService.getWarehouse(warehouse_id).toPromise();
          //console.log(result);
          this.warehouseDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
   
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save source...", this.sourceDetail);
  
  this.warehouseDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.warehouseDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateWarehouse(this.warehouseDetail).toPromise();
    }
else{
this.warehouseDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.warehouseDetail.created_time = Date.now();
result = await this._dbService.addWarehouse(this.warehouseDetail).toPromise();
}
//CustomLogger.logStringWithObject("addSource:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("Warehouse Added Successfully");
else
    CustomMisc.showAlert("Warehouse Updated Successfully");
this._router.navigate(["inventory/settings/dynamicsettings/warehouselist"]);

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

}