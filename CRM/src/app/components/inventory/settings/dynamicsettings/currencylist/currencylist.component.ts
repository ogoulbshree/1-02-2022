import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyDetail } from 'src/app/models/CurrencyDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-currencylist',
  templateUrl: './currencylist.component.html',
  styleUrls: ['./currencylist.component.css']
})
export class CurrencylistComponent extends DynamicComponent implements OnInit {

 

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) {
    super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_CURRENCY,injector);
   }
  isUpdate = false;
  currencyDetail : CurrencyDetail;
  filteredTableDataArr: any;
  currencyDataArr = [];
  searchText;
  key: string = 'id';
  reverse : boolean = false;
  p:number = 1;
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  currencyDetailsCount: number = 0;
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
    let result = await this._dbService.getAllCurrency(1).toPromise();
   // console.log("result:", result);
    this.currencyDataArr = result["results"];
    this.filteredTableDataArr = this.currencyDataArr;
    this.currencyDetailsCount =result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['inventory/settings/dynamicsettings/addcurrency',obj.currency_id]);
}



   
	   
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.currency_name)) {
      await this._dbService.deleteCurrency(obj).toPromise();
     // console.log("Implement delete functionality here");
      await this.init();
    }
  }
  

  
	
	
  filterData(){
    let currencyDataArr = [];
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
      for(let i = 0; i< this.currencyDataArr.length; i++){
       // console.log("this.departmentDataArr[i].created_time::::", this.departmentDataArr[i].created_time);
        if(this.currencyDataArr[i].created_time > filter.from && this.currencyDataArr[i].created_time < filter.to ){
          currencyDataArr.push(this.currencyDataArr[i]);
        }
      }
    }else{
      currencyDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = currencyDataArr;
  }
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllCurrency(event).subscribe((res:any) => {
      // console.log(res)

      this.currencyDataArr=res.results
      
      this.filteredTableDataArr = this.currencyDataArr;
    })

  }


  }
