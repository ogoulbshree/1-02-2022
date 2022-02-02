import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesstageDetail } from 'src/app/models/SalesStageDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 
@Component({
  selector: 'app-salesstage',
  templateUrl: './salesstage.component.html',
  styleUrls: ['./salesstage.component.css']
})
export class SalesstageComponent extends DynamicComponent implements OnInit {
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,@Inject(LOCALE_ID) public locale: string,injector: Injector,public _uiservice: UiService) { 
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_SALES_STAGE,injector);
  }

  isUpdate = false;

  salesstageDetail : SalesstageDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];
  

  async ngOnInit() {
    await this.populateFields();
  
    this.salesstageDetail = new SalesstageDetail();

    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let salesstage_id = params["id"];
        if (salesstage_id) {
          let result = await this._dbService.getSalesstage(salesstage_id).toPromise();
         // console.log(result);
          this.salesstageDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save Sales stage...", this.salesstageDetail);
  this.salesstageDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  /* 
   this.productDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
   this.salesstageDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateSalesstage(this.salesstageDetail).toPromise();
    }
else{
this.salesstageDetail.created_by= this._dbService.getCurrentUserDetail().email;
/*  this.productDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
 this.salesstageDetail.created_time = Date.now();
result = await this._dbService.addSalesstage(this.salesstageDetail).toPromise();
}
//CustomLogger.logStringWithObject("added sales stage:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("sales stage Added Successfully");
else
    CustomMisc.showAlert("sales stage Updated Successfully");
this._router.navigate(["sales/settings/dynamicsettings/salesstagelist"]);

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
