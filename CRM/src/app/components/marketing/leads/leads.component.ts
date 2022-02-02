import { Component, Injector, OnInit, Inject, LOCALE_ID,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { LeadDetail } from 'src/app/models/LeadDetail.model';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
import { SourceDetail } from 'src/app/models/SourceDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

  
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent extends DynamicComponent implements OnInit {

  convertIt = false;
  leadDetail: ObjectDetail;
  isUpdate = false;
 
  leadDataArr = [];
  
departmentDetail: DepartmentDetail[] = [];
sourceDetail: SourceDetail[] =[];

  activityDetail: ActivityDetail;
 
  acivityDataArr = [];
  filteredTableDataArr: any;
  updateFlag = false;
  file 
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  filtered
  searchText;
  rowsOnPage = 5;
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));

  
  constructor( private _router: Router,   @Inject(LOCALE_ID) public locale: string, private _activatedRoute: ActivatedRoute, injector: Injector,public _uiservice: UiService) {
      super(GlobalConstants.COMPONENT_NAME.MARKETING_LEADS,injector);
    }
  @ViewChild('f', null) f: NgForm;
   /*  async init(){
    
      let parent_id;
          let result = await this._dbService.getAllActivitiesOfParent(parent_id).toPromise();
          console.log(result);
          this.activityDetail = result["data"];
          this.filteredTableDataArr = this.acivityDataArr;
         
        }  */
    
 
    
  async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ) 
    {
    this.SHOW_ICONS = false;
    this.SHOW_EDIT_DELETE = true;
    this.ALL_DELETE_ALLOWED = false;
  }
  this.CAN_ADD = false;
  
  
 /* let result = await this._dbService.getObjectActivities(GlobalConstants.PARENT_ACTIVITY_LEAD).toPromise();
    
     console.log("result:", result);
    this.activityDataArr = result["data"];
    this.filteredTableDataArr = this.activityDataArr;
    
    let res = await this._dbService.objgetAllLeads().toPromise();
    console.log("result:", res);
    this.leadDataArr = result["data"];
    this.filtered = this.leadDataArr;
  }
*/
  }

  async htmlInit() {
    
    let result = await this._dbService.getAllDepartment(1).toPromise();
    this.departmentDetail = result["results"];

{
    let result = await this._dbService.getAllSource(1).toPromise();
  this.sourceDetail = result["results"];
} 

}

catch (error) {
  CustomLogger.logStringWithObject("ERROR:", error);
}


    async ngOnInit() {
      await this.init();
      await this.htmlInit();
      await this.populateFields();
    this.leadDetail = new ObjectDetail();
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let object_id = params["id"];
        if (object_id) {
          let result = await this._dbService.getCustomer(object_id).toPromise();
         // console.log(result);
          this.leadDetail = result["data"];
          this.isUpdate = true;
        } 
        let result = await this._dbService.getSpecificObjectActivities(this.leadDetail.object_id).toPromise();
      //  console.log("result:", result);
        this.activityDetail = result["data"];
      /*   this.filteredTableDataArr = this.activityDetail.object_id; */
            });}

            onClickEdit(obj) {
              this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
            }
            
            async onClickDelete(activityDetail) {
             // console.log("will delete activity:::", activityDetail);
              await this._dbService.deleteActivity(activityDetail).toPromise();
              await this.init();
            }
            showError = "";
  async onSubmit() {
    this.leadDetail.object_type = GlobalConstants.OBJECT_DETAIL_LEAD;
    //CustomLogger.logStringWithObject("Will save :", this.leadDetail);
    //CustomLogger.logStringWithObject("convertId:::: " , this.convertIt);
    this.leadDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
    this.leadDetail.modified_time = Date.now();

    try {
      let result = null;
     // CustomLogger.logStringWithObject("FILES:", this.file);
      if (this.file != undefined || this.file != null) {
        const formData = new FormData();
        formData.append('file', this.file);
        result = await this._dbService.uploadFile(formData).toPromise();
       // CustomLogger.logStringWithObject("uploadFile:result:", result);

        let fileName = GlobalConstants.DEFAULTS_FILE_LOCATIONS.ENTITY_ICONS + result["data"].filename;//received after file added
      //  CustomLogger.logStringWithObject("files:", fileName);
        this.leadDetail.files = fileName;

      }
    
      
      if (this.isUpdate){
      result = await this._dbService.updateLead(this.leadDetail, this.convertIt).toPromise();
      }
  else{
  this.leadDetail.created_by= this._dbService.getCurrentUserDetail().email;
  this.leadDetail.created_time = Date.now();
  result = await this._dbService.addCustomer(this.leadDetail).toPromise();
  }
 // CustomLogger.logStringWithObject("addedleads:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Leads Added Successfully");
  else
      CustomMisc.showAlert("Leads Updated Successfully");
  this._router.navigate(["/marketing/leadslist"]);

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
 selectImage(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.file = file;
  }
} 




}



