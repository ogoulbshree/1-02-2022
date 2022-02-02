import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignstatusDetail } from 'src/app/models/CampaignstatusDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-campaignstatuslist',
  templateUrl: './campaignstatuslist.component.html',
  styleUrls: ['./campaignstatuslist.component.css']
})
export class CampaignstatuslistComponent implements OnInit {

  

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,
    public _uiservice: UiService) { }
  isUpdate = false;
  campaignstatusDetail : CampaignstatusDetail;
  filteredTableDataArr: any;
  campaignstatusDataArr = [];
  searchText;
  p:number = 1;
  reverse:boolean = false;
  key:string = 'id';
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager
    ){
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllCampaignstatus().toPromise();
    //console.log("result:", result);
    this.campaignstatusDataArr = result["data"];
    this.filteredTableDataArr = this.campaignstatusDataArr;
  
  }
 async ngOnInit() {
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['marketing/settings/dynamicsettings/Campaign/campaignstatus',obj.campaign_status_id]);
}


async onClickDelete(obj) {
  //console.log("will delete campaignstatus:::", obj);
 
  await this._dbService.deleteCampaignstatus(obj).toPromise();
  await this.init();} 

  

  
	
	
  filterData(){
    let campaignstatusDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
   
   // console.log("this.fromDate::::", this.fromDate);
    //console.log("this.toDate::::", this.toDate);
    //console.log("filter.from::::", filter.from);
    //console.log("filter.to::::", filter.to);
  
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.campaignstatusDataArr.length; i++){
        //console.log("this.campaignstatusDataArr[i].created_time::::", this.campaignstatusDataArr[i].created_time);
        if(this.campaignstatusDataArr[i].created_time > filter.from && this.campaignstatusDataArr[i].created_time < filter.to ){
          campaignstatusDataArr.push(this.campaignstatusDataArr[i]);
        }
      }
    }else{
      campaignstatusDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = campaignstatusDataArr;
  }


  }
