import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseitemDetail } from 'src/app/models/ExpenseitemDetail';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-expensesitemlist',
  templateUrl: './expensesitemlist.component.html',
  styleUrls: ['./expensesitemlist.component.css']
})
export class ExpensesitemlistComponent  extends DynamicComponent  implements OnInit {

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_EXPENSES_ITEM,injector);
   }
  isUpdate = false;

  expenseItemDetail : ExpenseitemDetail;
  filteredTableDataArr: any;
  expenseItemDataArr = [];
  searchText;
fromDate;
toDate;
filterQuery = ""
expense_item :any;
   
  p:number =1;
   rowsOnPage = 5;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  expenseItemCount:number=0;
  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager 
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    )
      {
        this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllExpenseItem(1).toPromise();
    //console.log("result:", result);
    this.expenseItemDataArr = result["results"];
    this.filteredTableDataArr = this.expenseItemDataArr;
    this.expenseItemCount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['inventory/settings/dynamicsettings/addexpensesitem',obj.item_id]);
}


 
async  onClickDelete(obj) {
  if(confirm("Are you sure to delete "+obj.expense_item)) {
    await this._dbService.deleteExpenseItem(obj).toPromise();
    //console.log("Implement delete functionality here");
    await this.init();
  }
}



filterData(){
let expenseItemDataArr = [];
let filter = {
  from: new Date(this.fromDate).getTime(),
  to: new Date(this.toDate).getTime() + 86400000,  
};
/* console.log("this.fromDate::::", this.fromDate);
console.log("this.toDate::::", this.toDate);
console.log("filter.from::::", filter.from);
console.log("filter.to::::", filter.to); */
if(this.fromDate && this.toDate){
  for(let i = 0; i< this.expenseItemDataArr.length; i++){
    //console.log("this.expenseItemDataArr[i].created_time::::", this.expenseItemDataArr[i].created_time);
    if(this.expenseItemDataArr[i].created_time > filter.from && this.expenseItemDataArr[i].created_time < filter.to ){
      expenseItemDataArr.push(this.expenseItemDataArr[i]);
    }
  }
}else{
  expenseItemDataArr = this.filteredTableDataArr;
}
this.filteredTableDataArr = expenseItemDataArr;
}


searchData(){
 
 
  if(this.expense_item == ""){
  this.ngOnInit();
  }
  else{
    this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
      {
      return res.expense_item.toLocaleLowerCase().match(this.expense_item.toLocaleLowerCase());
    });
  }
  }
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllExpenseItem(event).subscribe((res:any) => {
      // console.log(res)

      this.expenseItemDataArr=res.results
      
      this.filteredTableDataArr = this.expenseItemDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }


  }