import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { Router, ActivatedRoute } from '@angular/router';


import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { UiService } from 'src/app/services/ui.service';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent  extends DynamicComponent  implements OnInit {



  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, public _uiservice: UiService,injector: Injector,@Inject(LOCALE_ID) public locale: string) { 
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_CATEGORY,injector);
  }
  isUpdate = false;

  categoryDetail : CategoryDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];
  

  async ngOnInit() {
    await this.populateFields();
  
    this.categoryDetail = new CategoryDetail();

    this._activatedRoute.params.subscribe(
      async params => {
      //  console.log("params:", params);
        let category_id = params["id"];
        if (category_id) {
          let result = await this._dbService.getCategory(category_id).toPromise();
         // console.log(result);
          this.categoryDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
   
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save product...", this.categoryDetail);
  
  this.categoryDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.categoryDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateCategory(this.categoryDetail).toPromise();
    }
    
else{
this.categoryDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.categoryDetail.created_time = Date.now();
result = await this._dbService.addCategory(this.categoryDetail).toPromise();
}
//CustomLogger.logStringWithObject("addCategory:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addCategory Added Successfully");
else
    CustomMisc.showAlert("addCategory Updated Successfully");
this._router.navigate(["sales/products/categorylist"]);
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

onClickForm() {
  this.categoryDetail.category_name = "";
  
}
}
