import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent extends DynamicComponent implements OnInit {

  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 

  constructor( private _router: Router, @Inject(LOCALE_ID) public locale: string, private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice: UiService,) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_DEPARTMENT,injector);
   }
  isUpdate = false;
  key: string = 'id'
  reverse :boolean = false;
  p:number =1;
  departmentDetail : DepartmentDetail;
  filteredTableDataArr: any;
  departmentDataArr = [];
  

  async ngOnInit() {
    await this.populateFields();
    this.departmentDetail = new DepartmentDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let department_id = params["id"];
        if (department_id) {
          let result = await this._dbService.getDepartment(department_id).toPromise();
          //console.log(result);
          this.departmentDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.departmentDetail);
  
  this.departmentDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.departmentDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateDepartment(this.departmentDetail).toPromise();
    }
else{
this.departmentDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.departmentDetail.created_time = Date.now();
result = await this._dbService.addDepartment(this.departmentDetail).toPromise();
}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addDepartment Added Successfully");
else
    CustomMisc.showAlert("addDepartment Updated Successfully");
this._router.navigate(["sales/settings/dynamicsettings/departmentlist"]);

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
  this.departmentDetail.department_name = "";
}
}