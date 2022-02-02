import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { Router } from '@angular/router';
const moment = require('moment');
@Component({
  selector: 'app-configureorganisation',
  templateUrl: 'configureorganisation.component.html',
  styleUrls: ['configureorganisation.component.css']
})
export class ConfigureOrganisationComponent extends DynamicComponent implements OnInit  {
  
  isUpdate = false;
  fieldTextType: boolean;
  userDetail: UserDetail;
  freeTrial;
  freeTrialID;
  constructor( private _router: Router,public _uiservice: UiService,injector: Injector,) {
    super(GlobalConstants.SALES_COMPONENT_NAME.ORGANISATION,injector);
  }
  expiryCalculator(){
    // expiration_date:
   
    let date  = new Date(new Date().setDate(new Date(this.userDetail.created_time).getDate() + 30));
    return   moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }
  async ngOnInit() {
    await this.populateFields();
    this.userDetail = this._dbService.getCurrentUserDetail();
    // console.log("this.userDetail", this.userDetail );
     this._dbService.getFreeTrialDays().subscribe(x=>{
      this.freeTrial = x["data"].freeTrialDays
      // console.log(this.freeTrialID);
     })
    
    
    //await this.populateFields();
    this.isUpdate = false;
  }

  onSubmit(){
    
    let data = {
      _id:this.freeTrialID.data[0]._id,
      freeTrialDays:this.freeTrial

    }
    this._dbService.updateFreeTrialDays(data).subscribe(x=>{
     alert("Free Trial Days Updated")
     this._router.navigate(['settings/setting']);
    })
  }
  saveTrial(){
    
  }
}
