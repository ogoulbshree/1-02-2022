import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { TravelDetail } from 'src/app/models/TravelDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent extends DynamicComponent implements OnInit {
  employeeArray = [];
  keyword = 'first_name';

  dateErrorFlag: Boolean = false;
  
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  constructor(private _router: Router,  @Inject(LOCALE_ID) public locale: string,private _activatedRoute: ActivatedRoute, injector: Injector,public _uiservice: UiService) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TRAVEL_LIST,injector);
   }
  isUpdate = false;

  travelDetail = new TravelDetail();
  departmentDetail: TravelDetail[] = [];
  filteredTableDataArr: any;
  travelDataArr = [];
  selectedEmployee;


  async htmlInit() {

    // let result = await this._dbService.getAllDepartment(1).toPromise();
    // this.departmentDetail = result["results"];
    this._dbService.getAllEmployees().subscribe((x: any) => this.employeeArray = x.data
    )
  }
  
  async ngOnInit() {

    await this.htmlInit();
    await this.populateFields();

    // this.travelDetail = new TravelDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        // console.log("params:", params);
        let travel_id = params["id"];
        if (travel_id) {
          let result = await this._dbService.getTravel(travel_id).toPromise();
          //console.log(result);
          this.travelDetail = result["data"];
          this.isUpdate = true;
        }

      }
    );


  }

  showError = "";
  async onSubmit() {
    //CustomLogger.logStringWithObject("Will save designation...", this.travelDetail);

    this.travelDetail.updated_by = this._dbService.getCurrentUserDetail().email;

    /* this.categoryDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.travelDetail.modified_time = Date.now();
    try {
      let result = null;
      if (this.isUpdate) {
        result = await this._dbService.updateTravel(this.travelDetail).toPromise();
      }
      else {
        this.travelDetail.created_by = this._dbService.getCurrentUserDetail().email;
        /* this.categoryDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.travelDetail.created_time = Date.now();
        this.travelDetail.employee_name= this.selectedEmployee;
      //  console.log(this.travelDetail.employee_name);
       
        result = await this._dbService.addTravel(this.travelDetail).toPromise();
      }
      //CustomLogger.logStringWithObject("addSource:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("Travel Added Successfully");
      else
        CustomMisc.showAlert(" Travel Updated Successfully");
      this._router.navigate(["hrms/settings/dynamicsettings/travellist"]);


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
    // this.travelDetail.designation_name = "";
  }
  selectEvent(employee) {
    // console.log("employee", employee);;

    this.selectedEmployee= employee["first_name"];
    // console.log( this.selectedEmployee );
    
  }
  dateSelected() {
    if (this.travelDetail.travel_date && this.travelDetail.return_date && new Date(this.travelDetail.travel_date) >= new Date(this.travelDetail.return_date)) {
       this.dateErrorFlag = true
     }
     else if(new Date(this.travelDetail.travel_date) < new Date(this.travelDetail.return_date)){
       this.dateErrorFlag = false
     }
 
 
   }

   onChangeSearch(evt){

   }
   onFocused(evt){

   }
}