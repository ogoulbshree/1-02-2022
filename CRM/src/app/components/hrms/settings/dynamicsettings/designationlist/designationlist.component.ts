import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationDetail } from 'src/app/models/DesignationDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-designationlist',
  templateUrl: './designationlist.component.html',
  styleUrls: ['./designationlist.component.css']
})
export class DesignationlistComponent  extends DynamicComponent implements OnInit {
  source_name: string;

  
  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DESIGNATION_LIST,injector);
   }
  isUpdate = false;
  designationDetail : DesignationDetail;
  filteredTableDataArr: any;
  designationDataArr = [];
  searchText;
  designation_name :any;
   
   p:number =1;
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  designationDetailsCount: number = 0;

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
    ){
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllDesignations().toPromise();
    //console.log("result:", result);
    this.designationDataArr = result["data"];
    this.filteredTableDataArr = this.designationDataArr;
    this.designationDetailsCount= result["data"].length;
  
  }
 async ngOnInit() {
 
  await this.init();
  await this.populateFields();
}

  
onClickEdit(obj) {
  this._router.navigate(['hrms/settings/dynamicsettings/designation',obj.designation_id]);
}



  
 
	   
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.designation_name)) {
      await this._dbService.deleteDesignation(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }
  
	
	
  filterData(){
    let designationDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
    /* console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to); */
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.designationDataArr.length; i++){
        //console.log("this.designationDataArr[i].created_time::::", this.designationDataArr[i].created_time);
        if(this.designationDataArr[i].created_time > filter.from && this.designationDataArr[i].created_time < filter.to ){
          designationDataArr.push(this.designationDataArr[i]);
        }
      }
    }else{
      designationDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = designationDataArr;
  }
  // searchData(){
 
 
  //   if(this.source_name == ""){
  //   this.ngOnInit();
  //   }
  //   else{
  //     this._dbService.getAllGlobalSearchByKeywordAndSection(this.source_name,'designation').subscribe((x: any)=>
  //     {
  //       this.filteredTableDataArr =x.data;
  //    });
  //   }
  //   }
    searchData(type){
 
      if(type == 'clear'&& !this.source_name)this.ngOnInit();
    
      else if(type == 'search') 
       this._dbService.getAllGlobalSearchByKeywordAndSection(this.source_name,'designation').subscribe((x: any)=>
       {
         this.filteredTableDataArr =x.data;
      });
      
     
      }
    pageChanged(data,event){
      console.log(data,event);
      this._dbService.getAllDesignation(event).subscribe((res:any) => {
        console.log(res)
  
        this.designationDataArr=res.results
        
        this.filteredTableDataArr = this.designationDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }

  }
