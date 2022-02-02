import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveDetails } from 'src/app/models/ActiveDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-activelist',
  templateUrl: './activelist.component.html',
  styleUrls: ['./activelist.component.css']
})
export class ActivelistComponent extends DynamicComponent implements OnInit {

  

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,
    public _uiservice: UiService) {

    super(GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_ACTIVE,injector);
   }
  isUpdate = false;
  activeDetail : ActiveDetails;
  filteredTableDataArr: any;
  activeDataArr = [];
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
   active :any;
   
   p:number =1;
 
 
    date = new Date;
    campaignactiveDetailCount: number=0;

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
    let result = await this._dbService.getAllCampaignactive(1).toPromise();
   // console.log("result:", result);
    this.activeDataArr = result["results"];
    this.filteredTableDataArr = this.activeDataArr;
    this.campaignactiveDetailCount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['marketing/settings/dynamicsettings/Campaign/active',obj.active_id]);
}


async onClickDelete(obj) {
  //console.log("will delete activeData:::", obj);
 
  await this._dbService.deleteCampaignactive(obj).toPromise();
  await this.init();} 

  

  
	
	
  filterData(){
    let activeDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
   // console.log("this.fromDate::::", this.fromDate);
   // console.log("this.toDate::::", this.toDate);
    //console.log("filter.from::::", filter.from);
    //console.log("filter.to::::", filter.to);
   
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.activeDataArr.length; i++){
       // console.log("this.activeDataArr[i].created_time::::", this.activeDataArr[i].created_time);
        if(this.activeDataArr[i].created_time > filter.from && this.activeDataArr[i].created_time < filter.to ){
          activeDataArr.push(this.activeDataArr[i]);
        }
      }
    }else{
      activeDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = activeDataArr;
  }

 
  searchData(){
 
 
    if(this.active == ""){
    this.ngOnInit();
    }
    else{
      this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
        {
        return res.active.toLocaleLowerCase().match(this.active.toLocaleLowerCase());
      });
    }
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllCampaignactive(event).subscribe((res:any) => {
        // console.log(res)
  
        this.activeDataArr=res.results
        
        this.filteredTableDataArr = this.activeDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }

  }
