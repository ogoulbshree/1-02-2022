import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { FormControl } from '@angular/forms';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';

import { formatDate } from "@angular/common";
import { of } from "rxjs";
import { TaskDetail } from 'src/app/models/TaskDetail.model';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends DynamicComponent implements OnInit {

  ACTIVITY_OBJECT_TYPE = [GlobalConstants.PARENT_ACTIVITY_CUSTOMER, 
     GlobalConstants.PARENT_ACTIVITY_LEAD,
  ];
  selectedActivityType;

  taskDetail = new TaskDetail();
  isUpdate = false;
  acivityDataArr = [];
  task_record_type;
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
  employeeArray=[];
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector,public _uiservice: UiService,@Inject(LOCALE_ID) public locale: string) {
   
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TASK_LIST,injector);


  }

  isLeadSelected = false;
  isContactSelected = false;
  isCustomerSelected = false;
  selectedEmployee:EmployeeDetail;
  phone;
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

  
  async ngOnInit() {

    this._dbService.getAllEmployees().subscribe(x => {
      this.employeeArray = x["data"]
    })
    await this.populateFields();

   
    // await this.init()
    this.updateFlag = this.isUpdate;

    // this.taskDetail = new TaskDetail();
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let activity_id = params["id"];
        if (activity_id) {
          let result = await this._dbService.getTask(activity_id).toPromise();
         // console.log(result);
          this.taskDetail = result["data"];
          this._dbService.getEmployeeByID(this.taskDetail.employee_id).subscribe(x => {
            this.selectedEmployee = x["data"]
          })
          this.isUpdate = true;
          //console.log("2nd ACITIVITY");
          //console.log(this.taskDetail);
          // this.populateFields(result["data"]["activity_type"]);
          // this.populateactivityFields(this.taskDetail.activity_type);
          
          
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
selectEvent(employee) {
  // console.log("employee", employee);;

  this.selectedEmployee = employee;
  // console.log(this.selectedEmployee);

}

  async onSubmit() {
   // CustomLogger.logStringWithObject("Will save Activity...", this.taskDetail);
    this.taskDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
     this.taskDetail.employee_id =  this.selectedEmployee.employee_id.toString();
    this.taskDetail.modified_time = Date.now();
    try {
      let result = null;
      if (this.isUpdate){
        result = await this._dbService.updateTask(this.taskDetail).toPromise();
      }
      else
{
      this.taskDetail.created_by= this._dbService.getCurrentUserDetail().email;
      /*    this.customerDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
         this.taskDetail.created_time = Date.now();
        
        result = await this._dbService.addTask(this.taskDetail).toPromise();
}

     // CustomLogger.logStringWithObject("addedleads:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("Activity Added Successfully");
      else
        CustomMisc.showAlert("Acivity Updated Successfully");
      this._router.navigate(["/hrms/settings/tasklist"]);


    }
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Leads: " + error.message, true);
    }

  }

  // set the mobile and customer name on select of customer
  // onContactSelect(contacts) {
  //   /*  this.quoteDetail.phone = customer.phone; */
  //   this.taskDetail = contacts;
  //   this.first_name = contacts.first_name;
  //   this.taskDetail.object_id = contacts.object_id;
  //   this.taskDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CONTACT;

  // }
  onChangeSearch(ev) {

  }
  onFocused(ev) {

  }

  // onleadSelect(lead) {
  //   /*  this.quoteDetail.phone = customer.phone; */
  //   this.taskDetail = lead;
  //   this.first_name = lead.first_name;
  //   this.taskDetail.object_id = lead.object_id;
  //   this.taskDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_LEAD;

  // }



  // oncustomerSelect(customer)
  // {
  //   this.taskDetail = customer;
  //   this.first_name = customer.first_name;
  //   this.taskDetail.object_id = customer.object_id;
  //   this.taskDetail.activity_type = GlobalConstants.PARENT_ACTIVITY_CUSTOMER;
  // }



  


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