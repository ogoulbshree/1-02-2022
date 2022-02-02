import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
import { SourceDetail } from 'src/app/models/SourceDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from '../../../services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";



@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent extends DynamicComponent implements  OnInit {

  convertItLead = false;
  contactDetail: ObjectDetail;
  isUpdate = false;
  contactDataArr = [];
  activityDetail: ActivityDetail;
  
departmentDetail: DepartmentDetail[] = [];
sourceDetail: SourceDetail[] =[];

  filteredTableDataArr: any;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, 
    private _uiService: UiService, injector: Injector,@Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) {
      super(GlobalConstants.COMPONENT_NAME.MARKETING_CONTACTS,injector);
   /*  this.contactDetail = new ObjectDetail(); */
  }
   /*----getcontact by id Functio--------------*/


   
   async init() {
  // let result = await this._dbService.getObjectActivities(GlobalConstants.PARENT_ACTIVITY_CONTACT).toPromise();
  if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ) {
    this.SHOW_ICONS = false;
    this.SHOW_EDIT_DELETE = true;
    this.ALL_DELETE_ALLOWED = false;
  }
  this.CAN_ADD = false;
  

  }

  onClickEdit(obj) {
    this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
  }
  
  async onClickDelete(obj) {
   // console.log("will delete activity:::", obj);
    await this._dbService.deleteActivity(obj).toPromise();
    await this.init();
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
      await this.htmlInit();
      await this.populateFields();
    this.contactDetail = new ObjectDetail(); 
   this._activatedRoute.params.subscribe(
      async params => {
      //  console.log("params:", params);
        let object_id = params["id"];
        if (object_id) {
          let result = await this._dbService.getCustomer(object_id).toPromise();
         // console.log(result);
          this.contactDetail = result["data"];
          this.isUpdate = true;
        }
    let result = await this._dbService.getSpecificObjectActivities(this.contactDetail.object_id).toPromise();
    //console.log("result:", result);
    this.activityDetail = result["data"];
  /*   this.filteredTableDataArr = this.activityDetail.object_id; */
        } 
       );
      
      }



   
   /*----save contact Function contact--------------*/
   showError = "";
  async onSubmit() {
    this.contactDetail.object_type = GlobalConstants.OBJECT_DETAIL_CONTACT;
    //CustomLogger.logStringWithObject("Will save Contacts...", this.contactDetail);
    //CustomLogger.logStringWithObject("convertItLead:::: " , this.convertItLead);
    
    this.contactDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
     
    this.contactDetail.modified_time = Date.now();
try {
      let result = null;
      if (this.isUpdate){
     
      result = await this._dbService.updateContact(this.contactDetail, this.convertItLead).toPromise();
      }
  else{
  this.contactDetail.created_by= this._dbService.getCurrentUserDetail().email;
  this.contactDetail.created_time = Date.now();
  result = await this._dbService.addCustomer(this.contactDetail).toPromise();
  }
  //CustomLogger.logStringWithObject("addedContacts:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Contacts Added Successfully");
  else
      CustomMisc.showAlert("Contacts Updated Successfully");
  this._router.navigate(["/marketing/contactlist"]);
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







}
   