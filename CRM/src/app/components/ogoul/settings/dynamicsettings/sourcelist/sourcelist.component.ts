import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceDetail } from 'src/app/models/SourceDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-sourcelist',
  templateUrl: './sourcelist.component.html',
  styleUrls: ['./sourcelist.component.css']
})
export class SourcelistComponent implements OnInit {



  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;
  sourceDetail : SourceDetail;
  filteredTableDataArr: any;
  sourceDataArr = [];
  searchText;
  
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
    ){
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

      }

    
      this.CAN_ADD = false;
    let result = await this._dbService.getAllSource(1).toPromise();
   // console.log("result:", result);
    this.sourceDataArr = result["results"];
    this.filteredTableDataArr = this.sourceDataArr;
  
  }
 async ngOnInit() {
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['sales/settings/dynamicsettings/source',obj.source_id]);
}


async onClickDelete(obj) {
  //console.log("will delete source:::", obj);
 
  await this._dbService.deleteSource(obj).toPromise();
  await this.init();} 

  

  
	
	
  filterData(){
    let sourceDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
   // console.log("this.fromDate::::", this.fromDate);
    //console.log("this.toDate::::", this.toDate);
    //console.log("filter.from::::", filter.from);
    //console.log("filter.to::::", filter.to);
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.sourceDataArr.length; i++){
      //  console.log("this.sourceDataArr[i].created_time::::", this.sourceDataArr[i].created_time);
        if(this.sourceDataArr[i].created_time > filter.from && this.sourceDataArr[i].created_time < filter.to ){
          sourceDataArr.push(this.sourceDataArr[i]);
        }
      }
    }else{
      sourceDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = sourceDataArr;
  }

  exportToPrint(){

  }
  downloadPdf(){
  
  }
  generateCsv(){}
  }
