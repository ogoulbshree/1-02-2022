import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ContactusDetail } from 'src/app/models/ContactusDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-contacteduserspage',
  templateUrl: './contacteduserspage.component.html',
  styleUrls: ['./contacteduserspage.component.css']
})
export class ContacteduserspageComponent implements OnInit {

 
  contactusDetail: ContactusDetail;
  /*  userType: UserType[] = []; */
   constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
 
   isUpdate = false;
 

  ngOnInit() {
    this.contactusDetail = new ContactusDetail();
 
    this._activatedRoute.params.subscribe(
      async params => {
       // console.log("params:", params);
        let contact_us_id = params["id"];
        if (contact_us_id) {
          let result = await this._dbService.getContactus(contact_us_id).toPromise();
         // console.log(result);
          this.contactusDetail = result["data"];
          this.isUpdate = true;
        }

      }
    );

  }


 
 
  async onSubmit() {
  //  CustomLogger.logStringWithObject("Will save Contactus...", this.contactusDetail);
try {
      let result = null;
      if (this.isUpdate){
      result = await this._dbService.updateContactus(this.contactusDetail).toPromise();
      }
  else{
  result = await this._dbService.addContactus(this.contactusDetail).toPromise();
  }
  //CustomLogger.logStringWithObject("addContactus:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Contactus Added Successfully");
  else
      CustomMisc.showAlert("Contactus Updated Successfully");
  this._router.navigate(["/userlist"]);
  

} 
catch (error) {
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in adding in Contactus: " + error.message, true);
}    
}
}