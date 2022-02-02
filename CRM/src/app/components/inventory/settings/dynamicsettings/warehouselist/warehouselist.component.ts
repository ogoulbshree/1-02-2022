import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { WarehouseDetail } from 'src/app/models/WarehouseDetail.model';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-warehouselist',
  templateUrl: './warehouselist.component.html',
  styleUrls: ['./warehouselist.component.css']
})
export class WarehouselistComponent extends DynamicComponent implements OnInit {

 

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,

    public _uiservice: UiService) {
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_WAREHOUSE,injector);
   }
   
   warehouse_name :any;
  p:number =1;
  isUpdate = false;
  warehouseDetail : WarehouseDetail;
  filteredTableDataArr: any;
  warehouseDataArr = [];
  searchText;
  
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  warehouseDetailcount: number=0;
  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    ){
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllWarehouse(1).toPromise();
    //console.log("result:", result);
    this.warehouseDataArr = result["results"];
    this.filteredTableDataArr = this.warehouseDataArr;
    this.warehouseDetailcount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['inventory/settings/dynamicsettings/warehouse',obj.warehouse_id]);
}




  

  	
async  onClickDelete(obj) {
  if(confirm("Are you sure to delete "+obj.warehouse_name)) {
    await this._dbService.deleteWarehouse(obj).toPromise();
    //console.log("Implement delete functionality here");
    await this.init();
  }
}
  
	
	
  filterData(){
    let warehouseDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
   /*  console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to); */
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.warehouseDataArr.length; i++){
        //console.log("this.sourceDataArr[i].created_time::::", this.sourceDataArr[i].created_time);
        if(this.warehouseDataArr[i].created_time > filter.from && this.warehouseDataArr[i].created_time < filter.to ){
          warehouseDataArr.push(this.warehouseDataArr[i]);
        }
      }
    }else{
      warehouseDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = warehouseDataArr;
  }


  searchData(){
 
 
    if(this.warehouse_name == ""){
    this.ngOnInit();
    }
    else{
      this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
        {
        return res.warehouse_name.toLocaleLowerCase().match(this.warehouse_name.toLocaleLowerCase());
      });
    }
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllWarehouse(event).subscribe((res:any) => {
        // console.log(res)
  
        this.warehouseDataArr=res.results
        
        this.filteredTableDataArr = this.warehouseDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  }
