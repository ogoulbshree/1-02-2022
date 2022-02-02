import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css']
})
export class DepartmentlistComponent  extends DynamicComponent implements OnInit {
  department_name: any;

  

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice:UiService) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_DEPARTMENT,injector);
   }
  isUpdate = false;
  departmentDetail : DepartmentDetail;
  filteredTableDataArr: any;
  departmentDataArr = [];
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
  departmentDetailsCount: number = 0;
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
    let result = await this._dbService.getAllDepartment(1).toPromise();
   // console.log("result:", result);
    this.departmentDataArr = result["results"];
    this.filteredTableDataArr = this.departmentDataArr;
    this.departmentDetailsCount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/settings/dynamicsettings/department',obj.department_id]);
}


searchData(type){
 
  if(type == 'clear'&& !this.department_name)this.ngOnInit();

  else if(type == 'search') 
   this._dbService.getAllGlobalSearchByKeywordAndSection(this.department_name,'department').subscribe((x: any)=>
   {
     this.filteredTableDataArr =x.data;
  });
  
 
  }
   
	   
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.department_name)) {
      await this._dbService.deleteDepartment(obj).toPromise();
     // console.log("Implement delete functionality here");
      await this.init();
    }
  }
  

  
	
	
  filterData(){
    let departmentDataArr = [];
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
      for(let i = 0; i< this.departmentDataArr.length; i++){
       // console.log("this.departmentDataArr[i].created_time::::", this.departmentDataArr[i].created_time);
        if(this.departmentDataArr[i].created_time > filter.from && this.departmentDataArr[i].created_time < filter.to ){
          departmentDataArr.push(this.departmentDataArr[i]);
        }
      }
    }else{
      departmentDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = departmentDataArr;
  }

  pageChanged(data,event){
    console.log(data,event);
    this._dbService.getAllDepartment(event).subscribe((res:any) => {
      console.log(res)

      this.departmentDataArr=res.results
      
      this.filteredTableDataArr = this.departmentDataArr;
    })

  }

  sort(id){

  }

  }
