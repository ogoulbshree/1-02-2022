import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceDetail } from 'src/app/models/SourceDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 
@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent  extends DynamicComponent implements OnInit {

  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));

  constructor( private _router: Router,   @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) {
    super(GlobalConstants.COMPONENT_NAME.SALES_SOURCE,injector);
   }
  isUpdate = false;

  sourceDetail : SourceDetail;
  filteredTableDataArr: any;
  sourceDataArr = [];
  

  async ngOnInit() {
  
    await this.populateFields();
    this.sourceDetail = new SourceDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let source_id = params["id"];
        if (source_id) {
          let result = await this._dbService.getSource(source_id).toPromise();
          //console.log(result);
          this.sourceDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save source...", this.sourceDetail);
  
  this.sourceDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
  
  /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
  this.sourceDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate){
    result = await this._dbService.updateSource(this.sourceDetail).toPromise();
    }
else{
this.sourceDetail.created_by= this._dbService.getCurrentUserDetail().email;
/* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
      this.sourceDetail.created_time = Date.now();
result = await this._dbService.addSource(this.sourceDetail).toPromise();
}
//CustomLogger.logStringWithObject("addSource:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addSource Added Successfully");
else
    CustomMisc.showAlert("addSource Updated Successfully");
this._router.navigate(["marketing/settings/dynamicsettings/sourcelist"]);


this.showError = "";
 
} 

catch (error) {
  /* CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
  CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
  CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
  CustomLogger.logError(error.message); */
  CustomMisc.showAlert(error.error.message, true);
  this.showError = error.error.message;
}  
  
}

onClickForm() {
  this.sourceDetail.source_name = "";
}
}