
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";

import { of } from "rxjs";
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent extends DynamicComponent implements OnInit {

 
  userDetail = new UserDetail();
 /*  userType: UserType[] = []; */
 employeeArray:EmployeeDetail[]=[];
 employee;
 newUserArr= [];
 email: string;
 keyword = 'email';
 
 currentDate = new Date();
 dateFormat = "dd MMM yyyy";
 currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,
    injector: Injector,@Inject(LOCALE_ID) public locale: string,
    public _uiservice: UiService) 
  {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_USER,injector);
  }
  isUpdate: boolean = false;
  fieldTextType: boolean;




  async init(){
    this._dbService.getAllEmployees().subscribe((x: any) => this.employeeArray = x.data
    )

  } 

  async ngOnInit() {
    if(localStorage.getItem("userDetailsHrms"))
    this.newUserArr = (JSON.parse(localStorage.getItem("userDetailsHrms")))
    await this.init();
    // this.userDetail = new UserDetail();
    await this.populateFields();
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let user_id = params["id"];
        if (user_id) {
          let result = await this._dbService.getUser(user_id).toPromise();
         // console.log(result);
          this.userDetail = result["data"];
          this.isUpdate = true;
        }

      }
    );
    
    }
      

  showError = "";

 
async onSubmit() {
  var tempArray = [];
  this.userDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  this.userDetail.modified_time = Date.now();

  try {
  let result = null;
  if (this.isUpdate){
  result = await this._dbService.updateUser(this.userDetail).toPromise();
  if(result)
  CustomMisc.showAlert("User Updated Successfully");
  }
  else{
  this.userDetail.created_by= this._dbService.getCurrentUserDetail().email;
  tempArray.push(this.userDetail.email)
  this.userDetail.emailArray= tempArray;
  this.userDetail.created_time = Date.now();
  this.newUserArr.push(this.userDetail);
  localStorage.setItem("userDetailsHrms",JSON.stringify(this.newUserArr))
  result = await this._dbService.addUser(this.userDetail).toPromise();
          if(result){
            CustomMisc.showAlert("User Added Successfully");
            this._router.navigate(["/hrms/settings/userlist"]);
            
          }
}
 
  this.showError = "";
 
  } 

  catch (error) {
  CustomMisc.showAlert(error, true);
  this.showError = error.error.message;
  } 
}
  toggleFieldTextType()
 {
  this.fieldTextType = !this.fieldTextType;
}
/* onClickForm() {
  this.marketinguserDetail.email = "";
  this.marketinguserDetail.first_name = "";
  this.marketinguserDetail.last_name = "";
  this.marketinguserDetail.password = "";
  this.marketinguserDetail.phone = "";
  this.marketinguserDetail.username = "";
  this.marketinguserDetail.usertype_name = "";
} */


selectEvent(employee){
  // this.userDetail = employee;
  this.email = employee.email;
  this.userDetail.employee_id = employee.employee_id;
  this.userDetail.first_name = employee.first_name;
  this.userDetail.last_name = employee.last_name;
  this.userDetail.phone = employee.phone;
  this.userDetail.email = employee.email;
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

}
