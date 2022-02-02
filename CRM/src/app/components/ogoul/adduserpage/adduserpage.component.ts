import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
  selector: 'app-adduserpage',
  templateUrl: './adduserpage.component.html',
  styleUrls: ['./adduserpage.component.css']
})
export class AdduserpageComponent implements OnInit {

  
  userDetail: UserDetail;
  newUserArr= [];
 /*  userType: UserType[] = []; */
  constructor( @Inject(LOCALE_ID) public locale: string,private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  isUpdate = false;
  fieldTextType: boolean;
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 

  async ngOnInit() {
   
    if(localStorage.getItem("userDetailOgoul"))
    this.newUserArr = (JSON.parse(localStorage.getItem("userDetailOgoul")))
    this.userDetail = new UserDetail();
    
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
  console.log("this",this.userDetail);
  
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
    console.log("main",this._dbService.getCurrentUserDetail());
    console.log("0",localStorage);
    
    
    this.newUserArr.push(this.userDetail)
    localStorage.setItem("userDetailOgoul",JSON.stringify(this.newUserArr))
    //localStorage.setItem('org',this._dbService.getCurrentUserDetail().organziation_id)
    // this._dbService.switchDBUsers(this.userDetail.created_by,this.userDetail.email).subscribe( async (res:any)=>{
    //   console.log("1",res);
    //   if(res.data){
    //     console.log("2",this._dbService.getCurrentUserDetail());
    //     this._dbService.switchDB(this._dbService.getCurrentUserDetail().organziation_id).subscribe(async (data:any)=>{  
    //       console.log("3",data);
    //       if(data.data){
            result = await this._dbService.addUser(this.userDetail).toPromise();
            if(result){
              CustomMisc.showAlert("User Added Successfully");
              this._router.navigate(["/ogoul/users"]);
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
