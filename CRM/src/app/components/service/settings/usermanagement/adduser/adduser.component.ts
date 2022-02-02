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



@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent  extends DynamicComponent implements OnInit {

  userDetail: UserDetail;
  newUserArr= [];
 /*  userType: UserType[] = []; */
 currentDate = new Date();
 dateFormat = "dd MMM yyyy";
 currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));

  constructor( private _router: Router,  @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) 
  {
      super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_USER,injector);
  }
  isUpdate = false;
  fieldTextType: boolean;


  

  async ngOnInit() {
    if(localStorage.getItem("userDetailService"))
    this.newUserArr = (JSON.parse(localStorage.getItem("userDetailService")))
    this.userDetail = new UserDetail();
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
  this.userDetail.created_by= this._dbService.getCurrentUserDetail().created_by;
  tempArray.push(this.userDetail.email)
  this.userDetail.emailArray= tempArray;
  this.userDetail.created_time = Date.now();
  this.userDetail.organziation_id= this._dbService.getCurrentUserDetail().organziation_id;

  this.newUserArr.push(this.userDetail)
  localStorage.setItem("userDetailService",JSON.stringify(this.newUserArr))

  // this._dbService.switchDBUsers(this.userDetail.created_by,this.userDetail.email).subscribe( async (res:any)=>{
  //   if(res.data){
  //     this._dbService.switchDB(this._dbService.getCurrentUserDetail().organziation_id).subscribe(async (data:any)=>{  
  //       if(data.data){
          result = await this._dbService.addUser(this.userDetail).toPromise();
          if(result){
            CustomMisc.showAlert("User Added Successfully");
            this._router.navigate(["/service/settings/userlist"]);
            
          }
  //       }
  //     })
  //   }
  // })
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
}
