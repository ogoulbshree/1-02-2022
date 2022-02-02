import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { SurveysDetail } from 'src/app/models/SurveysDetail.model';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  isUpdate = false;
surveyDetail: SurveysDetail;
  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,public activeModal: NgbActiveModal) { }

  ngOnInit() {
     this.surveyDetail = new SurveysDetail();

  this._activatedRoute.params.subscribe(
    async params => {
    //  console.log("params:", params);
      let survey_id = params["id"];
      if (survey_id) {
        let result = await this._dbService.getSurvey(survey_id).toPromise();
      //  console.log(result);
        this.surveyDetail = result["data"];
        this.isUpdate = true;
      }

    }
  );
  }


  
 async surveySubmit() {
   //CustomLogger.logStringWithObject("Will save survey...", this.surveyDetail);
try {
     let result = null;
     if (this.isUpdate)
     result = await this._dbService.updateSurvey(this.surveyDetail).toPromise();
 else
 result = await this._dbService.addSurvey(this.surveyDetail).toPromise();

 //CustomLogger.logStringWithObject("addSurvey:result:", result);
 if (!this.isUpdate)
     CustomMisc.showAlert("Survey Added Successfully");
 else
     CustomMisc.showAlert("Survey Updated Successfully");
 this._router.navigate(["/ogoul/surveyslist"]);
 

} 
catch (error) {
 CustomLogger.logError(error);
 CustomMisc.showAlert("Error in adding in Survey: " + error.message, true);
} 
this.activeModal.dismiss();
this.activeModal.close();   
}


}
