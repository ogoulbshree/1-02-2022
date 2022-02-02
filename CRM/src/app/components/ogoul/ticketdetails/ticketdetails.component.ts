import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDetail } from 'src/app/models/Ticketing.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent implements OnInit {

  

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;
  ticketDetail : TicketDetail;
  filteredTableDataArr: any;
  ticketDataArr = [];
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
   
   
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Ogoul_User ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Sales ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Service  ) 
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    
this.CAN_ADD = true;
    let result = await this._dbService.getAllOgoulTicketing().toPromise();
  //  console.log("result:", result);
    this.ticketDataArr = result["data"];
    this.filteredTableDataArr = this.ticketDataArr;
  
  }
 async ngOnInit() {
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['/ogoul/ticketingpage',obj.ogoul_ticket_id]);
}


async onClickDelete(obj) {
 // console.log("will delete Ticket:::", obj);
 
  await this._dbService.deleteTicketing(obj).toPromise();
  await this.init();} 

  search(term: string) {
    let fieldName = "name";
    this.filteredTableDataArr = this.ticketDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }

  
	
	
  filterData(){
    let ticketDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
    //console.log("this.fromDate::::", this.fromDate);
    //console.log("this.toDate::::", this.toDate);
    //console.log("filter.from::::", filter.from);
    //console.log("filter.to::::", filter.to);
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.ticketDataArr.length; i++){
      //  console.log("this.ticketDataArr[i].created_time::::", this.ticketDataArr[i].created_time);
        if(this.ticketDataArr[i].created_time > filter.from && this.ticketDataArr[i].created_time < filter.to ){
          ticketDataArr.push(this.ticketDataArr[i]);
        }
      }
    }else{
      ticketDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = ticketDataArr;
  }
  exportToPrint(){

  }
  downloadPdf(){
  
  }
  generateCsv(){}


  }