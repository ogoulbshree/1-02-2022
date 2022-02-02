import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequesteddemoDetail } from 'src/app/models/Requesteddemo.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
@Component({
  selector: 'app-requesteddemopage',
  templateUrl: './requesteddemopage.component.html',
  styleUrls: ['./requesteddemopage.component.css']
})
export class RequesteddemopageComponent implements OnInit {

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute){}

requestdemoDetail: RequesteddemoDetail

isUpdate = false;
fieldTextType: boolean;
closeResult: string;

async ngOnInit() {

 this.requestdemoDetail = new RequesteddemoDetail();

 this._activatedRoute.params.subscribe(
   async params => {
   //  console.log("params:", params);
     let Requested_demo_id = params["id"];
     if (Requested_demo_id) {
       let result = await this._dbService.getDemodetails(Requested_demo_id).toPromise();
      // console.log(result);
       this.requestdemoDetail = result["data"];
       this.isUpdate = true;
     }

   }
 );
 
 
}


async onSubmitDemo() {
// CustomLogger.logStringWithObject("Will save demo register...", this.requestdemoDetail);
try {
   let res = null;
   if (this.isUpdate){
   res = await this._dbService.updateDemodetails(this.requestdemoDetail).toPromise();
   }
else{
res = await this._dbService.addDemodetails(this.requestdemoDetail).toPromise();
}
//CustomLogger.logStringWithObject("adddemo:result:", res);
if (!this.isUpdate)
   CustomMisc.showAlert("contacted demo Added Successfully");
else
   CustomMisc.showAlert(" contacted demo Updated Successfully");
this._router.navigate(["/ogoul/requesteddemo"]);


} 
catch (error) {
CustomLogger.logError(error);
CustomMisc.showAlert("Error in demo contacted in Users: " + error.message, true);
}    

}

}
