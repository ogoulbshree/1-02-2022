import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { LeaveTypeDetail } from 'src/app/models/LeaveTypeDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-configureleaves',
  templateUrl: './configureleaves.component.html',
  styleUrls: ['./configureleaves.component.css']
})
export class ConfigureleavesComponent extends DynamicComponent implements OnInit {

  

  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  

  constructor( private _router: Router, @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute,public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CONFIGURE_LEAVE_LIST,injector);
   }
  isUpdate = false;
  key: string = 'id'
  reverse :boolean = false;
  p:number =1;
  filteredTableDataArr: any;
  departmentDataArr = [];
  leaveTypeDetail = new LeaveTypeDetail();

  async ngOnInit() {
    await this.populateFields();
    // this.leaveTypeDetail = new LeaveTypeDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let leavetype_id = params["id"];
        if (leavetype_id) {
          let result = await this._dbService.geLeaveType(leavetype_id).toPromise();
          //console.log(result);
          this.leaveTypeDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.leaveTypeDetail);
  
  this.leaveTypeDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.leaveTypeDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateLeaveType(this.leaveTypeDetail).toPromise();
    }
else{
this.leaveTypeDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.leaveTypeDetail.created_time = Date.now();
result = await this._dbService.addLeaveType(this.leaveTypeDetail).toPromise();
}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addDepartment Added Successfully");
else
    CustomMisc.showAlert("addDepartment Updated Successfully");
this._router.navigate(["hrms/settings/dynamicsettings/leavetypelist"]);

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
  // this.leaveTypeDetail.department_name = "";
}
}
