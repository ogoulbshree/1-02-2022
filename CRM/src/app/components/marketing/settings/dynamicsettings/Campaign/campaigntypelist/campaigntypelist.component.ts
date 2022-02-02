import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignstatusDetail } from 'src/app/models/CampaignstatusDetail.model';
import { CampaigntypeDetail } from 'src/app/models/CampaigntypeDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-campaigntypelist',
  templateUrl: './campaigntypelist.component.html',
  styleUrls: ['./campaigntypelist.component.css']
})
export class CampaigntypelistComponent extends DynamicComponent implements OnInit {

  

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) { 
    super(GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_TYPE,injector);
  }
  campaign_type_name :any;
   
  p:number =1;
  isUpdate = false;
  campaigntypeDetail : CampaigntypeDetail;
  filteredTableDataArr: any;
  campaigntypeDataArr = [];
  searchText;
  
   filterQuery = ""
   rowsOnPage = 5;
 
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  
  
  model: any = {
    fromDate: "",
    toDate:""
   };
 
 
    date = new Date;
    campaigntypeDetailCount: number=0;

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
    let result = await this._dbService.getAllCampaigntype(1).toPromise();
    //console.log("result:", result);
    this.campaigntypeDataArr = result["results"];
    this.filteredTableDataArr = this.campaigntypeDataArr;
    this.campaigntypeDetailCount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['marketing/settings/dynamicsettings/Campaign/campaigntype',obj.campaign_type_id]);
}


async onClickDelete(obj) {
  //console.log("will delete campaigntype:::", obj);
 
  await this._dbService.deleteCampaigntype(obj).toPromise();
  await this.init();} 

  

  
	
	
  filterData(){
    let campaigntypeDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
   
   // console.log("this.fromDate::::", this.fromDate);
    //console.log("this.toDate::::", this.toDate);
    //console.log("filter.from::::", filter.from);
    //console.log("filter.to::::", filter.to);
   
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.campaigntypeDataArr.length; i++){
       // console.log("this.campaigntypeDataArr[i].created_time::::", this.campaigntypeDataArr[i].created_time);
        if(this.campaigntypeDataArr[i].created_time > filter.from && this.campaigntypeDataArr[i].created_time < filter.to ){
          campaigntypeDataArr.push(this.campaigntypeDataArr[i]);
        }
      }
    }else{
      campaigntypeDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = campaigntypeDataArr;
  }

 
  searchData(){
 
 
    if(this.campaign_type_name == ""){
    this.ngOnInit();
    }
    else{
      this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
        {
        return res.campaign_type_name.toLocaleLowerCase().match(this.campaign_type_name.toLocaleLowerCase());
      });
    }
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllCampaigntype(event).subscribe((res:any) => {
        // console.log(res)
  
        this.campaigntypeDataArr=res.results
        
        this.filteredTableDataArr = this.campaigntypeDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  }
