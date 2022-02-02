import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeestatusDetail } from 'src/app/models/EmployeestatusDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 
@Component({
  selector: 'app-employeestatus',
  templateUrl: './employeestatus.component.html',
  styleUrls: ['./employeestatus.component.css']
})
export class EmployeestatusComponent extends DynamicComponent implements OnInit {

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  

  constructor( private _router: Router,@Inject(LOCALE_ID) public locale: string, private _activatedRoute: ActivatedRoute, public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEE_STATUS_LIST,injector);
   }
  isUpdate = false;
  key: string = 'id'
  reverse :boolean = false;
  p:number =1;
  employeestatusDetail = new EmployeestatusDetail();
  filteredTableDataArr: any;
  employeestatusDataArr = [];
  

  async ngOnInit() {
    await this.populateFields();
  
    // this.employeestatusDetail = new EmployeestatusDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let employee_status_id = params["id"];
        if (employee_status_id) {
          let result = await this._dbService.getEmployeestatus(employee_status_id).toPromise();
          //console.log(result);
          this.employeestatusDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.departmentDetail);
  
  this.employeestatusDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.employeestatusDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateEmployeestatus(this.employeestatusDetail).toPromise();
    }
else{
this.employeestatusDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.employeestatusDetail.created_time = Date.now();
result = await this._dbService.addEmployeestatus(this.employeestatusDetail).toPromise();
}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("EmployeestatusDetail Added Successfully");
else
    CustomMisc.showAlert("EmployeestatusDetail Updated Successfully");
this._router.navigate(["hrms/settings/dynamicsettings/employeestatuslist"]);

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