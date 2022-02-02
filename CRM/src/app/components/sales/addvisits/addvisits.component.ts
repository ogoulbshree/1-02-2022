
import { Component, OnInit, ViewChild, Inject, LOCALE_ID,ElementRef, Injector } from '@angular/core';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from '../../../services/ui.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { AddvisitsDetail } from 'src/app/models/AddvisitsDetail.model';
import { google } from "google-maps";
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
  
import { formatDate } from "@angular/common";

import { of } from "rxjs";

declare var google : google;
@Component({
  selector: 'app-addvisits',
  templateUrl: './addvisits.component.html',
  styleUrls: ['./addvisits.component.css']
})
export class AddvisitsComponent extends DynamicComponent implements OnInit {

  
  salesUsers:UserDetail[]=[];
  title = 'AGMMapAngular';
  isUpdate: boolean = false;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  
  latitude: number;
  longitude: number;
  zoom: number = 10;
  address: string;
  private geoCoder;

  keyword = 'first_name';
  newkeyword = 'email';
  customers:ObjectDetail[]=[];
  sales_email:string;
  
  addVisitDetail = new AddvisitsDetail();
  first_name:string;
  userDetail
  email: string;
  searchkeyword = 'email';
  infoWindow;
  selectedUser = new UserDetail();
  selectedCustomer = new ObjectDetail();
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private toastyService: ToastyService,
    private _activatedRoute: ActivatedRoute,public _uiservice: UiService,private _router: Router,injector: Injector, @Inject(LOCALE_ID) public locale: string) {

      super(GlobalConstants.SALES_COMPONENT_NAME.SALES_ADD_VISITS,injector);
     }
  updateFlag = false;
 
 async ngOnInit() {
  await this.populateFields();
    this.updateFlag = this.isUpdate;
    //load map and set current position of user, only runs in add mode
    if(!this.isUpdate){
      // console.log(this.addVisitDetail);
      
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
      });
    }

    this._dbService.getAllUsers().subscribe(res =>{
      res["data"].map(user => {
          if(user.usertype =="Sales User" || user.usertype =="Sales Manager" || user.usertype =="Sales Admin"){
            this.salesUsers.push(user)
          }
      })
    })
    // get all vendors/customers to show it in autocomplete field
   /*  this.util.updateSessionUser();
    this.util.userValue.subscribe(user => {
      this.email = user['email'];
    }); */
   
    // for editing a visit
    
    this._activatedRoute.params.subscribe(
      async params => {
        let visit_id = params["id"];
        if (visit_id) {
          this._dbService.getVisit(visit_id).subscribe(res => {
            if (res) {
              this.addVisitDetail = res["data"];
               //CustomLogger.logStringWithObject("addVisitDetail", this.addVisitDetail);
              this.latitude = this.addVisitDetail.lat;
              this.longitude = this.addVisitDetail.long;
              
              this.isUpdate = true;             
            }
          })
        }
      }
    );
    {
    this._dbService.getAllCustomers().subscribe(res => {
      if (res) {
        this.customers = res["data"];
      }
    });

    this._dbService.getAllUsers().subscribe(res => {
      if (res) {
        this.userDetail = res["data"];
      }
    });
  }
}
onSalesSelect(salesUser){
  
      this.addVisitDetail.sales_email = salesUser.email
      // console.log( this.addVisitDetail);
      // this.sales_email = salesUser.email;
       
     
      
    }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 10;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  

  onClickMarker(infoWindow, $event: MouseEvent){
    if(this.isUpdate){
      infoWindow.open();
    }
  }
  openMapInNewTab(lat,long){
    let url = 'https://www.google.com/maps/search/?api=1&query='+lat+','+long;
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  /* selectEvent(customer) {
    delete customer._id;
    this.customerVisit = customer;
  } */
 /*  selectUsers(userDetail) {
    delete userDetail._id;
    this.customerVisit = userDetail;
  } */
  selectEvent(customer){
  // this.addVisitDetail = customer;
  this.first_name = customer.first_name;
  this.addVisitDetail.email =customer.email;
  this.addVisitDetail.phone =customer.phone;
  this.addVisitDetail.last_name =customer.last_name;
  this.addVisitDetail.company_name =customer.company_name;
  this.addVisitDetail.other_address = customer.mailing_address;
  this.addVisitDetail.object_id = customer.object_id;
  this.addVisitDetail.first_name = customer.first_name;
  }
  
  selectUsers(userDetail)
  {
    this.addVisitDetail = userDetail;
    this.email = userDetail.email;
    this.addVisitDetail.user_id = userDetail.user_id;
   
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onChange(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

 async onSubmit () {
    let username;
    let useremail;

    //get the logged in user details - username and email
    this._uiservice.userValue.subscribe(user =>{
      if(user){
        username = user['username'];
        useremail = user['email'];
      }
    })
    //this.customerVisit.address = this.address;
  
    this.addVisitDetail.lat = this.latitude;
    this.addVisitDetail.long = this.longitude;
    //this.customerVisit.visit_added_by_username = username;
    //this.customerVisit.visit_added_by_name = username // remove if not required
    //this.customerVisit.visit_added_by_email = useremail // take from session
    //in case of update do not set the visit_id
    
    this.addVisitDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
    this.addVisitDetail.modified_time = Date.now();
    let newVisitDetail = new AddvisitsDetail();
    newVisitDetail.first_name = this.addVisitDetail.first_name;
    newVisitDetail.visits_note = this.addVisitDetail.visits_note;
    newVisitDetail.lat = this.addVisitDetail.lat;
    newVisitDetail.long = this.addVisitDetail.long;
    newVisitDetail.created_by = this.addVisitDetail.created_by;
    // newVisitDetail.user_id = this.addVisitDetail.user_id;
    newVisitDetail.updated_by = this.addVisitDetail.updated_by;
    newVisitDetail.created_time = this.addVisitDetail.created_time;
    newVisitDetail.visit_id = this.addVisitDetail.visit_id;
    newVisitDetail.modified_time = this.addVisitDetail.modified_time;
    newVisitDetail.object_id = this.addVisitDetail.object_id;
    newVisitDetail.follow_up_date = this.addVisitDetail.follow_up_date;
    // this.addVisitDetail.sales_email = this.addVisitDetail.email
   
  
/* 	 
    if (this.isUpdate) {
      this._dbService.updateVisit(this.addVisitDetail).subscribe(res => {
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
     
      })
    } 
    else { */


         
      try {
        let result = null;
        if (this.isUpdate){
        result = await this._dbService.updateVisit(this.addVisitDetail).toPromise();
        }
        
      else 
      {
      // set visit_id while adding new record
 
       this.addVisitDetail.visit_id = Date.now();
      this.addVisitDetail.created_by= this._dbService.getCurrentUserDetail().email;
       this.addVisitDetail.created_time = Date.now();
       let newVisitDetail = new AddvisitsDetail();
       newVisitDetail.first_name = this.addVisitDetail.first_name;
    
       newVisitDetail.visits_note = this.addVisitDetail.visits_note;
       newVisitDetail.lat = this.addVisitDetail.lat;
       newVisitDetail.long = this.addVisitDetail.long;
       newVisitDetail.created_by = this.addVisitDetail.created_by;
      //  newVisitDetail.user_id = this.addVisitDetail.user_id;
       newVisitDetail.updated_by = this.addVisitDetail.updated_by;
       newVisitDetail.created_time = this.addVisitDetail.created_time;
       newVisitDetail.visit_id = this.addVisitDetail.visit_id;
       newVisitDetail.modified_time = this.addVisitDetail.modified_time;
       newVisitDetail.object_id = this.addVisitDetail.object_id;
       newVisitDetail.follow_up_date = this.addVisitDetail.follow_up_date;
       newVisitDetail.sales_email =this.addVisitDetail.sales_email;
    /*   this._dbService.addVisit(newVisitDetail).subscribe(res => {
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
      
      })
    }
    this._router.navigate(['sales/addvisitslist'])

  }
 */
  result = await this._dbService.addVisit(newVisitDetail).toPromise();
}
  //CustomLogger.logStringWithObject("added Deals:result:", result);
  if (!this.isUpdate)
  CustomMisc.showAlert("Visit Added Successfully");
else
  CustomMisc.showAlert("Visit Updated Successfully");
  this._router.navigate(['/sales/addvisitslist']); 


} 

catch (error) {
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in Visits: " + error.message, true);
} 
  }
  
  showAlert(msg, type) {
    var toastOptions: ToastOptions = {
      title: type,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
      //  console.log('Toast ' + toast.id + ' has been removed!');
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
  mapClicked(id){
  
  }
}  
