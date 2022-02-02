import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from '../../../services/ui.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { ShedulevisitsDetail } from 'src/app/models/ShedulevisitsDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';



import { formatDate } from "@angular/common";

import { of } from "rxjs";
@Component({
  selector: 'app-shedulevisits',
  templateUrl: './shedulevisits.component.html',
  styleUrls: ['./shedulevisits.component.css']
})
export class ShedulevisitsComponent extends DynamicComponent implements OnInit {

  
  keyword = 'email';
  email :string;
  first_name:string;
  customer_keyword = "first_name";
  salesUsers:UserDetail[]=[];
  vendorLists:ObjectDetail[]=[];;
  sales_email;
  vendor;
  date;
  time;
  phone;
  other_address;
  salesUserEmail;
 
 
  scheduleVisit : ShedulevisitsDetail;
  isUpdate:boolean = false;
  showErrorMessage =false;
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  
 
  
  
  constructor(
    private toastyService: ToastyService,private _router: Router, 
    @Inject(LOCALE_ID) public locale: string,
    private _activatedRoute: ActivatedRoute,public _uiservice: UiService,injector: Injector) {

      super(GlobalConstants.SALES_COMPONENT_NAME.SALES_SHEDULE_VISITS,injector);
     }
  async ngOnInit() {
    await this.populateFields();
    //naveen - get all visits from db
    this._dbService.getAllCustomers().subscribe(res => {
      if (res) {
        this.vendorLists = res["data"];
      }
    });
    //naveen - get all sales users to populate in autocomplete dropdown 
    this._dbService.getAllUsers().subscribe(res =>{
      res["data"].map(user => {
          if(user.usertype =="Sales User" || user.usertype =="Sales Manager" || user.usertype =="Sales Admin"){
            this.salesUsers.push(user)
          }
      })
    })


    
    this.scheduleVisit = new ShedulevisitsDetail();
    this._activatedRoute.params.subscribe(
      async params =>  {
        let schedule_visit_id = params["id"];
        //console.log(params ,"params");
        if (schedule_visit_id) {
          this._dbService.getScheduleVisit(schedule_visit_id).subscribe(res =>  {
           // console.log(res ,"heree1");
            if (res) {
              this.scheduleVisit = res["data"];
              this.isUpdate = true;

              this.sales_email = this.scheduleVisit.email;
              this.vendor = this.scheduleVisit.first_name;
              this.phone = this.scheduleVisit.phone;
              this.other_address = this.scheduleVisit.other_address;
              this.date = this.scheduleVisit.date;
              this.time = this.scheduleVisit.time;
            
              
    this._dbService.getUserFromEmail(this.scheduleVisit.sales_email).subscribe(res1 => {
     // console.log("RES1:", res1);
    });
              
            
              
            }
          })
        }
      }
    );
  }
  onCustomerSelect(customer) {
    this.phone = customer.phone;
    this.other_address = customer.other_address;
    this.scheduleVisit = customer;

this.scheduleVisit.user_id =customer.user_id
    this.first_name = customer.first_name;
      this.scheduleVisit.object_id = customer.object_id;
  }

 
  onChangeSearch() {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  onSalesSelect(salesUser){
  

this.scheduleVisit.user_id =salesUser.user_id
    this.email = salesUser.email;
     
   
    
  }
 

 async onSubmit(){
  this.showErrorMessage = true
   // console.log("salesUser:::::", this.salesUser);
    //console.log("salesUser email:::::", this.salesUser.email);
    //console.log("this.scheduleVisit:::", this.scheduleVisit);
  this.scheduleVisit.email = this.email;
    
   /*  this.scheduleVisit.sales_email = this.salesUsers; */
    let username;
    let useremail;
    this._uiservice.userValue.subscribe(user =>{
      if(user){
        username = user['username'];
        useremail = user['email'];
      }
    });
  /*  if(this.salesUser && this.vendor && this.date && this.time){
      let visit = {
        schedule_visit_id: Date.now(),
        vendor_id: this.vendor._id,
        vendor_name: this.vendor.customer_name,
        sales_email: this.salesUser.email,
        phone:this.phone,
        address: this.address,
        sales_user_id: this.salesUser._id,
        schedule_visit_added_by_email: useremail,
        date: this.date,
        time: this.time,
        
      
      } */
      
	 this.scheduleVisit.updated_by= this._dbService.getCurrentUserDetail().email; 
    this.scheduleVisit.modified_time = Date.now(); 
  
     /*  if (this.isUpdate) {
        this._dbService.updateScheduleVisit(this.scheduleVisit).subscribe(res => {
          let type = res.status == 200 ? 'success' : 'failed'
          this.showAlert(res.message, type);
      
        })
      } */
        
      try {
        let result = null;
        if (this.isUpdate){
        result = await this._dbService.updateScheduleVisit(this.scheduleVisit).toPromise();
        }
        
      else 
      {
        this.scheduleVisit.schedule_visit_id = Date.now();
this.scheduleVisit.created_by= this._dbService.getCurrentUserDetail().email;
/*  this.salesUser.email= this.scheduleVisit.sales_email;  */
  this.scheduleVisit.created_time = Date.now(); 
  let newScheduleVisit = new ShedulevisitsDetail();
  newScheduleVisit.first_name = this.scheduleVisit.first_name;
  newScheduleVisit.object_id = this.scheduleVisit.object_id;
  newScheduleVisit.user_id = this.scheduleVisit.user_id;
  newScheduleVisit.other_address = this.scheduleVisit.other_address;
  newScheduleVisit.created_by = this.scheduleVisit.created_by;
  newScheduleVisit.updated_by = this.scheduleVisit.updated_by;
  newScheduleVisit.created_time = this.scheduleVisit.created_time;
  newScheduleVisit.schedule_visit_id = this.scheduleVisit.schedule_visit_id;
  newScheduleVisit.modified_time = this.scheduleVisit.modified_time;
  newScheduleVisit.phone = this.scheduleVisit.phone;
  newScheduleVisit.time = this.scheduleVisit.time;
  newScheduleVisit.schedule_visit_added_by_user_id = this.scheduleVisit.schedule_visit_added_by_user_id;
  newScheduleVisit.date = this.scheduleVisit.date;
newScheduleVisit.email = this.scheduleVisit.email; 


  result = await this._dbService.scheduleVisit(newScheduleVisit).toPromise();
}
  //CustomLogger.logStringWithObject("added Deals:result:", result);
  if (!this.isUpdate)
  CustomMisc.showAlert("Schedule Visit Added Successfully");
else
  CustomMisc.showAlert("Schedule Visit Updated Successfully");
  this._router.navigate(['/sales/shedulevisitslist']); 


} 

catch (error) {
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in Schedule Visits: " + error.message, true);
} 

       /*  this._dbService.scheduleVisit(newScheduleVisit).subscribe(res =>{
        let type = res.status == 200 ? 'success' : 'failed'
            this.showAlert(res.message, type);
            this._router.navigate(['managevisit/assignedvisit']); 
        
        }) */
}
 
  
  showAlert(msg, type) {
    var toastOptions: ToastOptions = {
      title: type,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        //console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
       // console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    if (type == "success") {
      this.toastyService.success(toastOptions);
    } else if (type == "failed") {
      this.toastyService.error(toastOptions);
    } else {
      this.toastyService.warning(toastOptions);
    }
  }
}

