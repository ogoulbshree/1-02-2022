import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent extends DynamicComponent implements OnInit {

 
  //1 - get the user details of the current user
  // 2 - get new password and confirm password
  //3 - compare the two passwords and if correct then store it in database and log out
  userDetail: UserDetail;
  changepassModel: any = {
    oldPassword: "",
    newPassword:"",
    confirmPassword:""
   };

  constructor(private _router: Router,injector: Injector, private _activatedRoute: ActivatedRoute,
    public _uiservice: UiService) {
    super(GlobalConstants.COMPONENT_NAME.CHANGE_PASSWORD,injector);
  }
  async ngOnInit() {
    await this.populateFields();
    this.userDetail = this._dbService.getCurrentUserDetail();
  }

  async onSubmit() {

    //console.log("oldPassword:", this.changepassModel.oldPassword);
    //console.log("newPassword:", this.changepassModel.newPassword);
    if(this.changepassModel.oldPassword != this.userDetail.password){
      //console.log("Old Password mismatch");
      alert("Old Password mismatch");
    } else if(this.changepassModel.newPassword != this.changepassModel.confirmPassword) {
      //console.log("New password mismatch");      
      alert("New password mismatch");
     } else {
      this.userDetail.password = this.changepassModel.newPassword;
      let result = await this._dbService.updateUser(this.userDetail).toPromise();
        //CustomLogger.logStringWithObject("result:", result);
       this._router.navigate([""]);
    }
    
  }

}