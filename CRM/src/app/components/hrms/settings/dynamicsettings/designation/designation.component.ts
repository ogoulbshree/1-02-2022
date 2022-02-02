import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { DesignationDetail } from 'src/app/models/DesignationDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

  
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent   extends DynamicComponent  implements OnInit {

 
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor(private _router: Router,  @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute,public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DESIGNATION_LIST,injector);
   }
  isUpdate = false;

  designationDetail = new DesignationDetail();
  departmentDetail: DepartmentDetail[] = [];
  filteredTableDataArr: any;
  designationDataArr = [];
  


  async htmlInit() {
    
    let result = await this._dbService.getAllDepartment(1).toPromise();
    this.departmentDetail = result["results"];

  }

  async ngOnInit() {
  
    await this.htmlInit();
    await this.populateFields();
  
    // this.designationDetail = new DesignationDetail();

    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let designation_id = params["id"];
        if (designation_id) {
          let result = await this._dbService.getDesignation(designation_id).toPromise();
          //console.log(result);
          this.designationDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save designation...", this.designationDetail);
  
  this.designationDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  if(this.designationDetail.designation_name.toLowerCase().includes('ceo'))
  this.designationDetail.designation_weight = 0;
  else if(this.designationDetail.designation_name.toLowerCase().includes('cto')
  || this.designationDetail.designation_name.toLowerCase().includes('coo')
  || this.designationDetail.designation_name.toLowerCase().includes('cmo')
  || this.designationDetail.designation_name.toLowerCase().includes('cfo')
  || this.designationDetail.designation_name.toLowerCase().includes('cpo')
  || this.designationDetail.designation_name.toLowerCase().includes('head')
  )
  this.designationDetail.designation_weight = 1;
  else if(this.designationDetail.designation_name.toLowerCase().includes('manager'))
  this.designationDetail.designation_weight = 2;
  else if(this.designationDetail.designation_name.toLowerCase().includes('lead'))
  this.designationDetail.designation_weight = 3;
  else
  this.designationDetail.designation_weight = 4;
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.designationDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateDesignation(this.designationDetail).toPromise();
    }
else{
this.designationDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.designationDetail.created_time = Date.now();
result = await this._dbService.addDesignation(this.designationDetail).toPromise();
}
//CustomLogger.logStringWithObject("addSource:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("Designation Added Successfully");
else
    CustomMisc.showAlert("addSource Updated Successfully");
this._router.navigate(["hrms/settings/dynamicsettings/designationlist"]);


this.showError = "";
 
} 

catch (error) {
 /*  CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
  CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
  CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
  CustomLogger.logError(error.message); */
  CustomMisc.showAlert(error.error.message, true);
  this.showError = error.error.message;
}  
  
}


onClickForm() {
  this.designationDetail.designation_name = "";
}
}