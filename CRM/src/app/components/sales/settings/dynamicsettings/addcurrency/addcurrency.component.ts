import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyDetail } from 'src/app/models/CurrencyDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',
  styleUrls: ['./addcurrency.component.css']
})
export class AddcurrencyComponent extends DynamicComponent implements OnInit {

  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  
  

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,  @Inject(LOCALE_ID) public locale: string, public _uiservice: UiService) {
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_CURRENCY,injector);
   }
  isUpdate = false;

  currencyDetail : CurrencyDetail;
  filteredTableDataArr: any;
  currencyDataArr = [];
  

  async ngOnInit() {
    await this.populateFields();
    this.currencyDetail = new CurrencyDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let currency_id = params["id"];
        if (currency_id) {
          let result = await this._dbService.getCurrency(currency_id).toPromise();
          //console.log(result);
          this.currencyDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.departmentDetail);
  
  this.currencyDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.currencyDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateCurrency(this.currencyDetail).toPromise();
    }
else{
this.currencyDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.currencyDetail.created_time = Date.now();
result = await this._dbService.addCurrency(this.currencyDetail).toPromise();
}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addCurrency Added Successfully");
else
    CustomMisc.showAlert("addCurrency Updated Successfully");
this._router.navigate(["sales/settings/dynamicsettings/currencylist"]);


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

onClickForm() {
  this.currencyDetail.currency_name = "";
}
}