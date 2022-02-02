import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { OrganisationInfoDetail } from 'src/app/models/OrganisationInfoDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-organisationinfo',
  templateUrl: './organisationinfo.component.html',
  styleUrls: ['./organisationinfo.component.css']
})
export class OrganisationinfoComponent extends DynamicComponent implements OnInit {

  

  constructor( @Inject(LOCALE_ID) public locale: string,private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice: UiService,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ORGANISATIONS_INFO_LIST,injector);
   }
  isUpdate = false;
  key: string = 'id'
  reverse :boolean = false;
  p:number =1;
  organisationInfoDetail = new OrganisationInfoDetail();
  filteredTableDataArr: any;
  departmentDataArr = [];
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  

  async ngOnInit() {
    await this.populateFields();
    // this.organisationInfoDetail = new OrganisationInfoDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let orginfo_id = params["id"];
        if (orginfo_id) {
          let result = await this._dbService.getOrganisationInfo(orginfo_id).toPromise();
          //console.log(result);
          this.organisationInfoDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError =""
async onSubmit() {
 // CustomLogger.logStringWithObject("Will save department...", this.organisationInfoDetail);
  
  this.organisationInfoDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.organisationInfoDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateOrganisationInfo(this.organisationInfoDetail).toPromise();
    }
else{
this.organisationInfoDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.organisationInfoDetail.created_time = Date.now();
result = await this._dbService.addOrganisationInfo(this.organisationInfoDetail).toPromise();
}
//CustomLogger.logStringWithObject("addDepartment:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("Organisation Added Successfully");
else
    CustomMisc.showAlert("Organisation Updated Successfully");
this._router.navigate(["/hrms/settings/dynamicsettings/orginfolist"]);

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

// onClickForm() {
//   this.organisationInfoDetail.department_name = "";
// }
}