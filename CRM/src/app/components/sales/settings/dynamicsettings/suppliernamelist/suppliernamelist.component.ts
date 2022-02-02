import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliernameDetail } from 'src/app/models/SuppliernameDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-suppliernamelist',
  templateUrl: './suppliernamelist.component.html',
  styleUrls: ['./suppliernamelist.component.css']
})
export class SuppliernamelistComponent extends DynamicComponent implements OnInit {

 

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector,
    public _uiservice: UiService) {
    
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SUPPLIER,injector);
  }

   
  isUpdate = false;
  suppliernameDetail : SuppliernameDetail;
  filteredTableDataArr: any;
  suppliernameDataArr = [];
  searchText;
  supplier_name :any;
  p:number =1;
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  suppliernameDetailcount: number=0;

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
    let result = await this._dbService.getAllSuppliername(1).toPromise();
   // console.log("result:", result);
    this.suppliernameDataArr = result["results"];
    this.filteredTableDataArr = this.suppliernameDataArr;
    this.suppliernameDetailcount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/settings/dynamicsettings/suppliername',obj.supplier_id]);
}



   
	   
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.supplier_name)) {
      await this._dbService.deleteSuppliername(obj).toPromise();
     // console.log("Implement delete functionality here");
      await this.init();
    }
  }
  

  
	
	
  filterData(){
    let suppliernameDataArr = [];
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
      for(let i = 0; i< this.suppliernameDataArr.length; i++){
       // console.log("this.departmentDataArr[i].created_time::::", this.departmentDataArr[i].created_time);
        if(this.suppliernameDataArr[i].created_time > filter.from && this.suppliernameDataArr[i].created_time < filter.to ){
          suppliernameDataArr.push(this.suppliernameDataArr[i]);
        }
      }
    }else{
      suppliernameDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = suppliernameDataArr;
  }

  searchData(){
 
 
    if(this.supplier_name == ""){
    this.ngOnInit();
    }
    else{
      this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
        {
        return res.supplier_name.toLocaleLowerCase().match(this.supplier_name.toLocaleLowerCase());
      });
    }
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllSuppliername(event).subscribe((res:any) => {
        // console.log(res)
  
        this.suppliernameDataArr=res.results
        
        this.filteredTableDataArr = this.suppliernameDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  }
