import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesstatusDetail } from 'src/app/models/Salesstatus.model';
import { StatusDetail } from 'src/app/models/StatusDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-statuslist',
  templateUrl: './statuslist.component.html',
  styleUrls: ['./statuslist.component.css']
})
export class StatuslistComponent implements OnInit {

  

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,
    public _uiservice: UiService) { }
  isUpdate = false;
  statusDetail : SalesstatusDetail;
  filteredTableDataArr: any;
  statusDataArr = [];
  searchText;
  key: string = 'id'
  reverse :boolean =false;
  p:number = 1;
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

  async init() {
   
    if (
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Admin ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Ogoul_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Super_Ogoul_Service
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Super_Ogoul_Manager
    ){
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllsalesStatus().toPromise();
   // console.log("result:", result);
    this.statusDataArr = result["data"];
    this.filteredTableDataArr = this.statusDataArr;
  
  }
 async ngOnInit() {
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/settings/dynamicsettings/status',obj.status_id]);
}



  

    	
async  onClickDelete(obj) {
  if(confirm("Are you sure to delete "+obj.status)) {
    await this._dbService.deletesalesStatus(obj).toPromise();
    //console.log("Implement delete functionality here");
    await this.init();
  }
}
	
	
  filterData(){
    let sourceDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
   /*  console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to); */
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.statusDataArr.length; i++){
       // console.log("this.sourceDataArr[i].created_time::::", this.statusDataArr[i].created_time);
        if(this.statusDataArr[i].created_time > filter.from && this.statusDataArr[i].created_time < filter.to ){
          sourceDataArr.push(this.statusDataArr[i]);
        }
      }
    }else{
      this.statusDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = this.statusDataArr;
  }


  }
