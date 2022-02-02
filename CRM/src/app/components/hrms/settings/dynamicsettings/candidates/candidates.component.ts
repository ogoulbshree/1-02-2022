import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateDetail } from 'src/app/models/CandidateDetails.model';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent  extends DynamicComponent implements OnInit {
  employeeArray = [];
  keyword = 'first_name';

  dateErrorFlag: Boolean = false;
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor(private _router: Router,  @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute, public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CANDIDATE_LIST, injector);

}
  isUpdate = false;

  candidateDetail= new CandidateDetail();
  departmentDetail: CandidateDetail[] = [];
  filteredTableDataArr: any;
  travelDataArr = [];
  selectedEmployee;


  async htmlInit() {

    // let result = await this._dbService.getAllDepartment(1).toPromise();
    // this.departmentDetail = result["results"];
    // this._dbService.getAllEmployees().subscribe((x: any) => this.employeeArray = x.data
    // )
  }
  
  async ngOnInit() {

    await this.htmlInit();
    await this.populateFields();

    // this.candidateDetail = new CandidateDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        // console.log("params:", params);
        let candidate_id = params["id"];
        if (candidate_id) {
          let result = await this._dbService.getCandidate(candidate_id).toPromise();
          //console.log(result);
          this.candidateDetail = result["data"];
          this.isUpdate = true;
        }

      }
    );


  }

  showError = "";
  async onSubmit() {
    //CustomLogger.logStringWithObject("Will save designation...", this.candidateDetail);

    this.candidateDetail.updated_by = this._dbService.getCurrentUserDetail().email;
    this.candidateDetail.candidate_status = "New";
    /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.candidateDetail.modified_time = Date.now();
    try {
      let result = null;
      if (this.isUpdate) {
        result = await this._dbService.updateCandidate(this.candidateDetail).toPromise();
      }
      else {
        this.candidateDetail.created_by = this._dbService.getCurrentUserDetail().email;
        /* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.candidateDetail.created_time = Date.now();
       
        result = await this._dbService.addCandidate(this.candidateDetail).toPromise();
      }
      //CustomLogger.logStringWithObject("addSource:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("Candidate Added Successfully");
      else
        CustomMisc.showAlert(" Candidate Updated Successfully");
      this._router.navigate(["hrms/settings/dynamicsettings/candidatelist"]);


      this.showError = "";

    }

    catch (error) {
      /*  CustomLogger.logStringWithObject("eeeeeeeeeeeeeeeee", error);
       CustomLogger.logStringWithObject("mmmmmmmmmmmmm", error.error.message);
       CustomLogger.logStringWithObject("kkkkkkkkkk", error['error'].message);
       CustomLogger.logError(error.message); */
      CustomMisc.showAlert(error.error.message, true);
      this.showError = error.error.message;
    }

  }


  onClickForm() {
    // this.candidateDetail.designation_name = "";
  }
}