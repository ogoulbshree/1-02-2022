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
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent extends DynamicComponent implements OnInit {

  userDetail: UserDetail;
 /*  userType: UserType[] = []; */
 currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
  
  constructor( private _router: Router,@Inject(LOCALE_ID) public locale: string, private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) 
  {
      super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_USER,injector);
  }
  isUpdate = false;
  fieldTextType: boolean;






  async ngOnInit() {
    this.userDetail = this._dbService.getCurrentUserDetail();
    await this.populateFields();
    this.isUpdate = false;

  }





  async onSubmit() {
    //CustomLogger.logStringWithObject("Will save user...", this.userDetail);
    this.userDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
   
    this.userDetail.modified_time = Date.now();
    try {
            
     let result = await this._dbService.updateUser(this.userDetail).toPromise();
      //CustomLogger.logStringWithObject("result:", result);
      CustomMisc.showAlert("User Profile successfully updated...");
  } catch (err)
   {
      CustomLogger.logStringWithObject("error from database:", err.error.message);
      alert("Error:::" + err.error.message);
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



