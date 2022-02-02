import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { SurveysDetail } from 'src/app/models/SurveysDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-surveyslist',
  templateUrl: './surveyslist.component.html',
  styleUrls: ['./surveyslist.component.css']
})
export class SurveyslistComponent implements OnInit {

  
surveyDetail : SurveysDetail
surveyDataArr = [];
filteredTableDataArr: any;
flagShowUserReport = true;
searchText;

 filterQuery = ""
 rowsOnPage = 5;
 
 ALL_DELETE_ALLOWED = true;
 CAN_ADD = true;
 SHOW_ICONS = true;
 SHOW_EDIT_DELETE = true;

constructor(private _dbService: DBService, private _router: Router) { }

async init() {
 
  
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Ogoul_User ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Sales ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Service  ) 
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    
this.CAN_ADD = true;
let result = await this._dbService.getAllSurvey().toPromise();
  console.log("result:", result);
  this.surveyDataArr = result["data"];
  this.filteredTableDataArr = this.surveyDataArr;
}
 
async ngOnInit() {
await this.init();
}

onClickEdit(obj) {
  this._router.navigate(['/ogoul/surveys', obj.survey_id]);
}

async onClickDelete(obj) {
  console.log("will delete survey:::", obj);
  await this._dbService.deleteSurvey(obj).toPromise();
  await this.init();
}

exportToPrint(){

}
downloadPdf(){

}
generateCsv(){}
}