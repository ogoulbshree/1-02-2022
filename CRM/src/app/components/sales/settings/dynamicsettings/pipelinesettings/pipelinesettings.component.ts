import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { PipelineDetail } from 'src/app/models/PipelineDetail.model';
import { Router, ActivatedRoute } from '@angular/router';


import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

 

@Component({
  selector: 'app-pipelinesettings',
  templateUrl: './pipelinesettings.component.html',
  styleUrls: ['./pipelinesettings.component.css']
})
export class PipelinesettingsComponent extends DynamicComponent implements OnInit {
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor( private _router: Router,  @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice: UiService) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_PIPELINE,injector);
   }

  isUpdate = false;

  pipelineDetail : PipelineDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];
  

  async ngOnInit() {
  
    await this.populateFields();
    this.pipelineDetail = new PipelineDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let pipeline_id = params["id"];
        if (pipeline_id) {
          let result = await this._dbService.getPipeline(pipeline_id).toPromise();
          //console.log(result);
          this.pipelineDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
  showError = "";
async onSubmit() {
  //CustomLogger.logStringWithObject("Will save pipeline...", this.pipelineDetail);
  this.pipelineDetail.updated_by= this._dbService.getCurrentUserDetail().email; 
   /* 
    this.productDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.pipelineDetail.modified_time = Date.now();
try {
    let result = null;
    if (this.isUpdate)
    {
    result = await this._dbService.updatePipeline(this.pipelineDetail).toPromise();
    }
else{
this.pipelineDetail.created_by= this._dbService.getCurrentUserDetail().email;
/*  this.productDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
 this.pipelineDetail.created_time = Date.now();
result = await this._dbService.addPipeline(this.pipelineDetail).toPromise();
}
//CustomLogger.logStringWithObject("added pipeline:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("Pipeline Added Successfully");
else
    CustomMisc.showAlert("Pipeline Updated Successfully");
this._router.navigate(["sales/settings/dynamicsettings/pipelinesettinglist"]);

this.showError = "";
}

catch (error) {
/*   CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
  CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
  CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
  CustomLogger.logError(error.message); */
  CustomMisc.showAlert(error.error.message, true);
  this.showError = error.error.message;
}  
  
}
}
/* onClickForm() {
  this.categoryDetail.category_name = "";
  
} */

