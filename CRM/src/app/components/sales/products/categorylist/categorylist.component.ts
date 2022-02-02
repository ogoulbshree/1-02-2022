import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';

import { DBService } from 'src/app/services/dbservice.service';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { UiService } from 'src/app/services/ui.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent  extends DynamicComponent  implements OnInit {

 

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, public _uiservice: UiService,injector: Injector) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_CATEGORY,injector);
   }
  isUpdate = false;
  categoryDetail : CategoryDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];
  searchText;
  
  category_name :any;
  p:number =1;
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  categoryDetailscount : number=0;
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
    let result = await this._dbService.getAllCategory(1).toPromise();
    //console.log("result:", result);
    this.categoryDataArr = result["results"];
    this.filteredTableDataArr = this.categoryDataArr;
    this.categoryDetailscount =result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/products/categoryadd',obj.category_id]);
}


async onClickDelete(obj) {
  //console.log("will delete Category:::", obj);
 
  await this._dbService.deleteCategory(obj).toPromise();
  await this.init();} 

  search(term: string) {
    let fieldName = "category_name";
    this.filteredTableDataArr = this.categoryDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }

  
	
	
  filterData(){
    let categoryDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
   
   /*  console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to);
    */
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.categoryDataArr.length; i++){
     //   console.log("this.categoryDataArr[i].created_time::::", this.categoryDataArr[i].created_time);
        if(this.categoryDataArr[i].created_time > filter.from && this.categoryDataArr[i].created_time < filter.to ){
          categoryDataArr.push(this.categoryDataArr[i]);
        }
      }
    }else{
      categoryDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = categoryDataArr;
  }

  searchData(){
 
 
    if(this.category_name == ""){
    this.ngOnInit();
    }
    else{
      this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
        {
        return res.category_name.toLocaleLowerCase().match(this.category_name.toLocaleLowerCase());
      });
    }
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllCategory(event).subscribe((res:any) => {
        // console.log(res)
  
        this.categoryDataArr=res.results
        
        this.filteredTableDataArr = this.categoryDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }

  }