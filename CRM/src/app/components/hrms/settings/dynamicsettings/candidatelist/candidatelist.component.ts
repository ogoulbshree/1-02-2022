import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationDetail } from 'src/app/models/DesignationDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';



@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent extends DynamicComponent implements OnInit {
  employeeArray = [];


  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CANDIDATE_LIST, injector);

}
  isUpdate = false;
  designationDetail: DesignationDetail;
  filteredTableDataArr=[];
  candidateDataArr = [];
  searchText;
  designation_name: any;
  p: number = 1;
  filterQuery = ""
  rowsOnPage = 5;

  fromDate;
  toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  candidateDetailsCount: number = 0;
  employee_name;
  async init() {

    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
   
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    ) {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

    }


    this.CAN_ADD = false;
    this._dbService.getAllEmployees().subscribe(async (x: any) => {
      this.employeeArray = x.data;
      let result = await this._dbService.getAllCandidate(1).toPromise();
      this.candidateDataArr = result["results"];
      this.filteredTableDataArr = this.candidateDataArr;
      this.candidateDetailsCount = result["count"];
    }

    )


  }
  async ngOnInit() {

    await this.init();
    await this.populateFields();
  }



  onClickEdit(obj) {
    this._router.navigate(['hrms/settings/dynamicsettings/candidates', obj.candidate_id]);
  }






  async onClickDelete(obj) {
    if (confirm("Are you sure to delete " + obj.candidate_name)) {
      await this._dbService.deleteCandidate(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }

  getEmployeeName = (id) => {
    console.log("I am id",id);
    
    for (let k = 0; k < this.employeeArray.length; k++) {
      console.log(this.employeeArray[k].employee_id , id);
      
      if (this.employeeArray[k].employee_id == id)
        return this.employeeArray[k].first_name;

    }

  }



  filterData() {
    let candidateDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,
    };
    /* console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to); */
    if (this.fromDate && this.toDate) {
      for (let i = 0; i < this.candidateDataArr.length; i++) {
        //console.log("this.candidateDataArr[i].created_time::::", this.candidateDataArr[i].created_time);
        if (this.candidateDataArr[i].created_time > filter.from && this.candidateDataArr[i].created_time < filter.to) {
          candidateDataArr.push(this.candidateDataArr[i]);
        }
      }
    } else {
      candidateDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = candidateDataArr;
  }
 
  searchData(type){
 
    if(type == 'clear'&& !this.employee_name)this.ngOnInit();
  
    else if(type == 'search') 
     this._dbService.getAllGlobalSearchByKeywordAndSection(this.employee_name,'candidate').subscribe((x: any)=>
     {
       this.filteredTableDataArr =x.data;
    });
    
   
    }
  pageChanged(data, event) {
    console.log(data, event);
    this._dbService.getAllCandidate(event).subscribe((res: any) => {
      console.log(res)

      this.candidateDataArr = res.results

      this.filteredTableDataArr = this.candidateDataArr;
    })

  }
  key: string = 'id'
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
