import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DBService } from 'src/app/services/dbservice.service';

import { SalesstageDetail} from 'src/app/models/SalesStageDetail.model';

import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-salesstagelist',
  templateUrl: './salesstagelist.component.html',
  styleUrls: ['./salesstagelist.component.css']
})
export class SalesstagelistComponent extends DynamicComponent implements OnInit {

  
  

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice: UiService) { 
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_SALES_STAGE,injector);
  }
  salesstage_name :any;
  p:number =1;
  isUpdate = false;
  salesstageDetail : SalesstageDetail;
  filteredTableDataArr: any;
  salesstageDataArr = [];
  searchText;
  
  fromDate;
    toDate;
   filterQuery = ""
   rowsOnPage = 5;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  salesstageDetailcount :number=0;

  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    ){
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllSalesstage(1).toPromise();
    //console.log("result:", result);
    this.salesstageDataArr= result["results"];
    this.filteredTableDataArr = this.salesstageDataArr;
    this.salesstageDetailcount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/settings/dynamicsettings/salesstage', obj.salesstage_id]);
}



	
async  onClickDelete(obj) {
  if(confirm("Are you sure to delete "+obj.salesstage_name)) {
    await this._dbService.deleteSalesstage(obj).toPromise();
    //console.log("Implement delete functionality here");
    await this.init();
  }
}

	
  filterData(){
    let salesstageDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
    /* console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to); */
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.salesstageDataArr.length; i++){
       // console.log("this.salesstageDataArr[i].created_time::::", this.salesstageDataArr[i].created_time);
        if(this.salesstageDataArr[i].created_time > filter.from && this.salesstageDataArr[i].created_time < filter.to ){
          salesstageDataArr.push(this.salesstageDataArr[i]);
        }
      }
    }else{
      salesstageDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = salesstageDataArr;
  }



  searchData(){
 
 
    if(this.salesstage_name == ""){
    this.ngOnInit();
    }
    else{
      this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
        {
        return res.salesstage_name.toLocaleLowerCase().match(this.salesstage_name.toLocaleLowerCase());
      });
    }
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllSalesstage(event).subscribe((res:any) => {
        // console.log(res)
  
        this.salesstageDataArr=res.results
        
        this.filteredTableDataArr = this.salesstageDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  
  }