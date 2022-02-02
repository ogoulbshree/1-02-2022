import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadsourceDetail } from 'src/app/models/LeadsourceDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-leadsourcelist',
  templateUrl: './leadsourcelist.component.html',
  styleUrls: ['./leadsourcelist.component.css']
})
export class LeadsourcelistComponent  extends DynamicComponent implements OnInit {


  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice: UiService) { 
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_LEAD_SOURCE,injector);
  }
  isUpdate = false;
  leadsourceDetail : LeadsourceDetail;
  filteredTableDataArr: any;
  leadsourceDataArr = [];
  searchText;
  filterQuery = ""
   rowsOnPage = 5;
fromDate;
toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  lead_source_name :any;
   
  p:number =1;
 
  leadsourceDetailcount: number =0;
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
    let result = await this._dbService.getAllLeadsource(1).toPromise();
    //console.log("result:", result);
    this.leadsourceDataArr= result["results"];
    this.filteredTableDataArr = this.leadsourceDataArr;
    this.leadsourceDetailcount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/settings/dynamicsettings/leadsource', obj.lead_source_id]);
}




 
async  onClickDelete(obj) {
  if(confirm("Are you sure to delete "+obj.lead_source_name)) {
    await this._dbService.deleteLeadsource(obj).toPromise();
    //console.log("Implement delete functionality here");
    await this.init();
  }
}



filterData(){
let leadsourceDataArr = [];
let filter = {
  from: new Date(this.fromDate).getTime(),
  to: new Date(this.toDate).getTime() + 86400000,  
};
/* console.log("this.fromDate::::", this.fromDate);
console.log("this.toDate::::", this.toDate);
console.log("filter.from::::", filter.from);
console.log("filter.to::::", filter.to); */
if(this.fromDate && this.toDate){
  for(let i = 0; i< this.leadsourceDataArr.length; i++){
   // console.log("this.leadsourceDataArr[i].created_time::::", this.leadsourceDataArr[i].created_time);
    if(this.leadsourceDataArr[i].created_time > filter.from && this.leadsourceDataArr[i].created_time < filter.to ){
      leadsourceDataArr.push(this.leadsourceDataArr[i]);
    }
  }
}else{
  leadsourceDataArr = this.filteredTableDataArr;
}
this.filteredTableDataArr = leadsourceDataArr;
}

searchData(){
 
 
  if(this.lead_source_name == ""){
  this.ngOnInit();
  }
  else{
    this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
      {
      return res.lead_source_name.toLocaleLowerCase().match(this.lead_source_name.toLocaleLowerCase());
    });
  }
  }
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllLeadsource(event).subscribe((res:any) => {
      // console.log(res)

      this.leadsourceDataArr=res.results
      
      this.filteredTableDataArr = this.leadsourceDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  
  }
  