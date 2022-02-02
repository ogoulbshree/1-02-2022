import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DBService } from 'src/app/services/dbservice.service';

import { PipelineDetail } from 'src/app/models/PipelineDetail.model';

import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-pipelinesettinglist',
  templateUrl: './pipelinesettinglist.component.html',
  styleUrls: ['./pipelinesettinglist.component.css']
})
export class PipelinesettinglistComponent extends DynamicComponent implements OnInit {

  

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice: UiService) { 
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_PIPELINE,injector);
  }

  pipeline_name :any;
  p:number =1;
  isUpdate = false;
  pipelineDetail : PipelineDetail;
  filteredTableDataArr: any;
  pipelineDataArr = [];
  searchText;
fromDate;
toDate;
filterQuery = ""
   rowsOnPage = 5;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  pipelineDetailcount: number=0;
  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager 
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    )
      {
        this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllPipeline(1).toPromise();
    //console.log("result:", result);
    this.pipelineDataArr = result["results"];
    this.filteredTableDataArr = this.pipelineDataArr;
    this.pipelineDetailcount = result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/settings/dynamicsettings/pipelinesettings', obj.pipeline_id]);
}




 
async  onClickDelete(obj) {
  if(confirm("Are you sure to delete "+obj.pipeline_name)) {
    await this._dbService.deletePipeline(obj).toPromise();
    //console.log("Implement delete functionality here");
    await this.init();
  }
}




filterData(){
let pipelineDataArr = [];
let filter = {
  from: new Date(this.fromDate).getTime(),
  to: new Date(this.toDate).getTime() + 86400000,  
};
/* console.log("this.fromDate::::", this.fromDate);
console.log("this.toDate::::", this.toDate);
console.log("filter.from::::", filter.from);
console.log("filter.to::::", filter.to); */
if(this.fromDate && this.toDate){
  for(let i = 0; i< this.pipelineDataArr.length; i++){
    //console.log("this.pipelineDataArr[i].created_time::::", this.pipelineDataArr[i].created_time);
    if(this.pipelineDataArr[i].created_time > filter.from && this.pipelineDataArr[i].created_time < filter.to ){
      pipelineDataArr.push(this.pipelineDataArr[i]);
    }
  }
}else{
  pipelineDataArr = this.filteredTableDataArr;
}
this.filteredTableDataArr = pipelineDataArr;
}


searchData(){
 
 
  if(this.pipeline_name == ""){
  this.ngOnInit();
  }
  else{
    this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
      {
      return res.pipeline_name.toLocaleLowerCase().match(this.pipeline_name.toLocaleLowerCase());
    });
  }
  }
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllPipeline(event).subscribe((res:any) => {
      // console.log(res)

      this.pipelineDataArr=res.results
      
      this.filteredTableDataArr = this.pipelineDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  }