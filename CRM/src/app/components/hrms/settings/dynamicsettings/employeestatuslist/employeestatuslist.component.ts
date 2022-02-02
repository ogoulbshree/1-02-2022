import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeestatusDetail } from 'src/app/models/EmployeestatusDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-employeestatuslist',
  templateUrl: './employeestatuslist.component.html',
  styleUrls: ['./employeestatuslist.component.css']
})
export class EmployeestatuslistComponent extends DynamicComponent implements OnInit {
  employee_status: any;

    

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEE_STATUS_LIST,injector);
   }
  isUpdate = false;
  employeestatusDetail : EmployeestatusDetail;
  filteredTableDataArr: any;
  employeestatusDataArr = [];
  searchText;
  
   filterQuery = ""
   rowsOnPage = 5;
   key: string = 'id'
   reverse:boolean = false;
   p:number = 1;
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  employeestatusDetailsCount: number = 0;
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
    )
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllEmployeestatus(1).toPromise();
   // console.log("result:", result);
    this.employeestatusDataArr = result["results"];
    this.filteredTableDataArr = this.employeestatusDataArr;
    this.employeestatusDetailsCount = result["count"];
  
  }
 async ngOnInit() {
  
  await this.init();
  await this.populateFields();
}

  
  
onClickEdit(obj) {
  this._router.navigate(['hrms/settings/dynamicsettings/employeestatus',obj.employee_status_id]);
}



   
	   
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.employee_status)) {
      await this._dbService.deleteEmployeestatus(obj).toPromise();
     // console.log("Implement delete functionality here");
      await this.init();
    }
  }
  

  
	
	
  filterData(){
    let employeestatusDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
    
  /*   console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to);
   */
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.employeestatusDataArr.length; i++){
       // console.log("this.departmentDataArr[i].created_time::::", this.departmentDataArr[i].created_time);
        if(this.employeestatusDataArr[i].created_time > filter.from && this.employeestatusDataArr[i].created_time < filter.to ){
          employeestatusDataArr.push(this.employeestatusDataArr[i]);
        }
      }
    }else{
      employeestatusDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = employeestatusDataArr;
  }

  pageChanged(data,event){
    console.log(data,event);
    this._dbService.getAllEmployeestatus(event).subscribe((res:any) => {
      console.log(res)

      this.employeestatusDataArr=res.results
      
      this.filteredTableDataArr = this.employeestatusDataArr;
    })

  }
  searchData(type){
 
    if(type == 'clear'&& !this.employee_status)this.ngOnInit();
  
    else if(type == 'search') 
     this._dbService.getAllGlobalSearchByKeywordAndSection(this.employee_status,'employeestatus').subscribe((x: any)=>
     {
       this.filteredTableDataArr =x.data;
    });
    
   
    }

  sort(id){

  }

  }
