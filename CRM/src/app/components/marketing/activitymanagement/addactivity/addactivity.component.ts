import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { FormControl } from '@angular/forms';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent extends DynamicComponent implements OnInit {

  ACTIVITY_OBJECT_TYPE = [GlobalConstants.PARENT_ACTIVITY_CUSTOMER, 
     GlobalConstants.PARENT_ACTIVITY_LEAD,
  ];
  selectedActivityType;

  activityDetail: ActivityDetail;
  isUpdate = false;
  acivityDataArr = [];

  keyword = "first_name";
  first_name: string;
  campaign_name: string;
  searchkeyword = "campaign_name"
  contacts;
  lead;
  customer
  campaigns
  updateFlag = false;
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,  @Inject(LOCALE_ID) public locale: string,injector: Injector,public _uiservice: UiService) {
   
      super(GlobalConstants.COMPONENT_NAME.MARKETING_ACTIVITIES,injector);


  }

  isLeadSelected = false;
  isContactSelected = false;
  isCustomerSelected = false;
  
  async selectObject() {
   // console.log("SELECTED OBJ: ", this.selectedActivityType);
    if (this.selectedActivityType == GlobalConstants.PARENT_ACTIVITY_CONTACT) {
      this.isContactSelected = true;
    
      this._dbService.objgetAllContacts(1).subscribe(res => {
        if (res)
          this.contacts = res["results"];
      });
      this.isLeadSelected = false;
      this.isCustomerSelected = false;
      
    } 
    else if (this.selectedActivityType == GlobalConstants.PARENT_ACTIVITY_LEAD) {
      //console.log("LEAD");
      this.isLeadSelected = true;
      this.isContactSelected = false;
      this.isCustomerSelected = false;
     
      this._dbService.objgetAllLeads(1).subscribe(res => {
        if (res)
          this.lead = res["results"];
      });
    } 
    else if (this.selectedActivityType == GlobalConstants.PARENT_ACTIVITY_CUSTOMER) 
    {
     // console.log("CUSTOMER");
    
      this.isLeadSelected = false;
      this.isContactSelected = false;
      this.isCustomerSelected = true;
     
      this._dbService.objgetAllCustomer(1).subscribe(res => {
        if (res)
          this.customer = res["results"];
      });
    }
    
    // switch (this.selectedActivityType) {
    //   case GlobalConstants.PARENT_ACTIVITY_CONTACT:
    //     console.log("CONTACT");
    //     this.isContactSelected = true;
    //     // this.contacts = await this._dbService.objgetAllContacts();
    //     this._dbService.objgetAllContacts().subscribe(res => {
    //       if (res)
    //         this.contacts = res["data"]; 
    //     });
    //     this.isLeadSelected = false;
    //     this.isCustomerSelected = false;
    //     break;
    //   case GlobalConstants.PARENT_ACTIVITY_LEAD:
    //     console.log("LEAD");
    //     this.isLeadSelected = true;
    //     this.isContactSelected = false;
    //     this.isCustomerSelected = false;
    //     this._dbService.objgetAllLeads().subscribe(res => {
    //       if (res)
    //         this.lead = res["data"];
    //     });
    //     break;
    //   case GlobalConstants.PARENT_ACTIVITY_CUSTOMER:
    //     console.log("CUSTOMER");
    //     this.isLeadSelected = false;
    //     this.isContactSelected = false;
    //     this.isCustomerSelected = true;        
    //     break;
    //   defult:
    //     console.log("WRONG ONE");
    // }
    //console.log("DONE");

  }

  async init() {


    this.activityDetail = new ActivityDetail();
    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let object_id = params["id"];
        if (object_id) {
          let result = await this._dbService.getAllActivitiesOfParent(object_id).toPromise();
          //console.log(result);
          this.activityDetail = result["data"];
          //console.log("ACTIVITY:::");
          //console.log(this.activityDetail);
          this.isUpdate = true;
        }
      }
    );


    {
      this._dbService.objgetAllContacts(1).subscribe(res => {
        if (res)
          this.contacts = res["results"];
      });

      this._dbService.objgetAllLeads(1).subscribe(res => {
        if (res)
          this.lead = res["results"];
      });
      
    }
  }
  async ngOnInit() {
    await this.populateFields();
    await this.init()
    this.updateFlag = this.isUpdate;


    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let activity_id = params["id"];
        if (activity_id) {
          let result = await this._dbService.getActivity(activity_id).toPromise();
         // console.log(result);
          this.activityDetail = result["data"];
          this.isUpdate = true;
          //console.log("2nd ACITIVITY");
          //console.log(this.activityDetail);
          // this.populateFields(result["data"]["activity_type"]);
          this.populateactivityFields(this.activityDetail.activity_type);
          
          
        }

      });
 
  }

  populateactivityFields(activityType){
    if(activityType == "Contact"){
      this.isContactSelected = true;
    }
    else if(activityType == "Customer")
    {
      this.isCustomerSelected = true;
    }
  else if(activityType == "Lead"){
      this.isLeadSelected = true;
    }
 
}

  async onSubmit() {
   // CustomLogger.logStringWithObject("Will save Activity...", this.activityDetail);
    this.activityDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
     
    this.activityDetail.modified_time = Date.now();
    try {
      let result = null;
      if (this.isUpdate){
        result = await this._dbService.updateActivity(this.activityDetail).toPromise();
      }
      else
{
      this.activityDetail.created_by= this._dbService.getCurrentUserDetail().email;
      /*    this.customerDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
         this.activityDetail.created_time = Date.now();
         let newactivityDetail = new ActivityDetail;
         newactivityDetail.activity_id = this.activityDetail.activity_id;
         newactivityDetail.activity_type = this.activityDetail.activity_type;
         newactivityDetail.subject = this.activityDetail.subject;
         newactivityDetail.due_date = this.activityDetail.due_date;
         newactivityDetail.task_name = this.activityDetail.task_name;
         newactivityDetail.status = this.activityDetail.status;
         newactivityDetail.comments = this.activityDetail.comments;
         newactivityDetail.call_dec = this.activityDetail.call_dec;
         newactivityDetail.selectedActivityType = this.activityDetail.selectedActivityType;
         newactivityDetail.parent_id = this.activityDetail.parent_id;
         newactivityDetail.record_type = this.activityDetail.record_type;
         newactivityDetail.object_id = this.activityDetail.object_id;
         newactivityDetail.created_by = this.activityDetail.created_by;
         newactivityDetail.modified_time = this.activityDetail.modified_time;
         newactivityDetail.updated_by = this.activityDetail.updated_by;
         newactivityDetail.created_time = this.activityDetail.created_time;
        result = await this._dbService.addActivity(newactivityDetail).toPromise();
}

     // CustomLogger.logStringWithObject("addedleads:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("Activity Added Successfully");
      else
        CustomMisc.showAlert("Acivity Updated Successfully");
      this._router.navigate(["/marketing/activitymanagement/activitylist"]);


    }
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Leads: " + error.message, true);
    }

  }

  // set the mobile and customer name on select of customer
  onContactSelect(contacts) {
    /*  this.quoteDetail.phone = customer.phone; */
    this.activityDetail = contacts;
    this.first_name = contacts.first_name;
    this.activityDetail.object_id = contacts.object_id;
    this.activityDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CONTACT;

  }
  onChangeSearch(ev) {

  }
  onFocused(ev) {

  }

  onleadSelect(lead) {
    /*  this.quoteDetail.phone = customer.phone; */
    this.activityDetail = lead;
    this.first_name = lead.first_name;
    this.activityDetail.object_id = lead.object_id;
    this.activityDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_LEAD;

  }



  oncustomerSelect(customer)
  {
    this.activityDetail = customer;
    this.first_name = customer.first_name;
    this.activityDetail.object_id = customer.object_id;
    this.activityDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CUSTOMER;
  }



  


 /*  isNameSelected: boolean

  selectInput(event) {
    let isNameSelected = event.target.value;

    if (isNameSelected === "1") {
      this.isNameSelected = true;
    }
    else if (isNameSelected === "2") {
      this.isNameSelected = false;
    }
    else if (isNameSelected === "3") {
      this.isNameSelected = false;

    }


  } */
}