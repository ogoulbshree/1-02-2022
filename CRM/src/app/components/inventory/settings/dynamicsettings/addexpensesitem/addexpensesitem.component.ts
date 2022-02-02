import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseitemDetail } from 'src/app/models/ExpenseitemDetail';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { formatDate } from "@angular/common";

import { of } from "rxjs";
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-addexpensesitem',
  templateUrl: './addexpensesitem.component.html',
  styleUrls: ['./addexpensesitem.component.css']
})
export class AddexpensesitemComponent extends DynamicComponent implements OnInit {

  

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor(  public _uiservice: UiService,private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,@Inject(LOCALE_ID) public locale: string) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_EXPENSES_ITEM,injector);
   }

  isUpdate = false;

  expenseItemDetail : ExpenseitemDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];

  async ngOnInit() {
  
    await this.populateFields();
    this.expenseItemDetail = new ExpenseitemDetail();

    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let item_id = params["id"];
        if (item_id) {
          let result = await this._dbService.getExpenseItem(item_id).toPromise();
         // console.log(result);
          this.expenseItemDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save ExpensesItem...", this.expenseItemDetail);
  this.expenseItemDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
   /* 
    this.productDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.expenseItemDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateExpenseItem(this.expenseItemDetail).toPromise();
    }
else{
this.expenseItemDetail.created_by= this._dbService.getCurrentUserDetail().email;
/*  this.productDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
 this.expenseItemDetail.created_time = Date.now();
result = await this._dbService.addExpenseItem(this.expenseItemDetail).toPromise();
}
//CustomLogger.logStringWithObject("added ExpensesItem:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("ExpensesItem Added Successfully");
else
    CustomMisc.showAlert("ExpensesItem Updated Successfully");
this._router.navigate(["inventory/settings/dynamicsettings/expensesitemlist"]);

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
/* onClickForm() {
  this.categoryDetail.category_name = "";
  
} */
}
