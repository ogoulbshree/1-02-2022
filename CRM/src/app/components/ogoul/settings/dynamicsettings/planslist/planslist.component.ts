import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansDetail } from 'src/app/models/PlansDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-planslist',
  templateUrl: './planslist.component.html',
  styleUrls: ['./planslist.component.css']
})
export class PlanslistComponent implements OnInit {

 

  constructor( private _router: Router,private _dbService: DBService, private _activatedRoute: ActivatedRoute,public _uiservice: UiService) {
   
   }
   plan :any;
   p:number =1;
   isUpdate = false;
   plansDetail : PlansDetail;
   filteredTableDataArr: any;
   plansDataArr = [];
   searchText;
   
    filterQuery = ""
    rowsOnPage = 5;
  
    fromDate;
    toDate;
   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   planDetailcount: number=0;
 
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
     let result = await this._dbService.getAllPlans(1).toPromise();
     //console.log("result:", result);
     this.plansDataArr = result["results"];
     this.filteredTableDataArr = this.plansDataArr;
     this.planDetailcount = result["count"];
   
   }
  async ngOnInit() {
   
   await this.init();}
 
   
   
 onClickEdit(obj) {
   this._router.navigate(['ogoul/settings/dynamicsettings/plans',obj.plan_id]);
 }
 
 
 
 
   
 
     
 async  onClickDelete(obj) {
   if(confirm("Are you sure to delete "+obj.plan)) {
     await this._dbService.deletePlans(obj).toPromise();
     //console.log("Implement delete functionality here");
     await this.init();
   }
 }
   
   
   
   filterData(){
     let plansDataArr = [];
     let filter = {
       from: new Date(this.fromDate).getTime(),
       to: new Date(this.toDate).getTime() + 86400000,  
     };
    /*  console.log("this.fromDate::::", this.fromDate);
     console.log("this.toDate::::", this.toDate);
     console.log("filter.from::::", filter.from);
     console.log("filter.to::::", filter.to); */
     if(this.fromDate && this.toDate){
       for(let i = 0; i< this.plansDataArr.length; i++){
         //console.log("this.sourceDataArr[i].created_time::::", this.sourceDataArr[i].created_time);
         if(this.plansDataArr[i].created_time > filter.from && this.plansDataArr[i].created_time < filter.to ){
          plansDataArr.push(this.plansDataArr[i]);
         }
       }
     }else{
      plansDataArr = this.filteredTableDataArr;
     }
     this.filteredTableDataArr = plansDataArr;
   }
 
 
   searchData(){
  
  
     if(this.plan == ""){
     this.ngOnInit();
     }
     else{
       this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
         {
         return res.plan.toLocaleLowerCase().match(this.plan.toLocaleLowerCase());
       });
     }
     }
     pageChanged(data,event){
       // console.log(data,event);
       this._dbService.getAllSource(event).subscribe((res:any) => {
         // console.log(res)
   
         this.plansDataArr=res.results
         
         this.filteredTableDataArr = this.plansDataArr;
       })
   
     }
     key: string = 'id'
     reverse :boolean =false;
     sort(key){
       this.key = key;
       this.reverse = !this.reverse;
     }
   }
 