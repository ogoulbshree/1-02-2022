import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DatePipe } from '@angular/common';
import { DBService } from 'src/app/services/dbservice.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { saveAs } from 'file-saver';
import { UiService } from 'src/app/services/ui.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends DynamicComponent implements OnInit {
  userlogin;
  _userlogin;
  fromDate;
  toDate;
  filterQuery = ""
  rowsOnPage = 5;
  searchText;
  page:number=1;
  usertype :any;
  key: string = 'id'
  reverse :boolean =false;
  
  model: any = {
    fromDate: "",
    toDate:""
   };
 
 
    date = new Date;

  constructor( 
    private datePipe: DatePipe,injector: Injector,

    public _uiservice: UiService,private toast: ToastrService,private datepipe: DatePipe) { 
      super(GlobalConstants.COMPONENT_NAME.MARKETING_HISTORY,injector) 
    }

  async ngOnInit() {
    await this.populateFields();
    this._dbService.getAllUserlogin().subscribe(res => {
      if (res) {
        this._userlogin = res.data;
        this.userlogin = res.data;
      }
    });
  }
  

  downloadFile() {
    let data = [];
    this.userlogin.forEach(element => {
      let obj ={
  
        Email:element.email,
        Action: element.action,
        Date: this.datePipe.transform(element.login_id,'short')
      }
      data.push(obj);
    });
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, "userActions.csv");
  }
  filterloginActions(){
    let filteredloginActions = [];
    let filter = {
      from: new Date(this.model.fromDate).getTime(),
      to: new Date(this.model.toDate).getTime() + 86400000,  
    };
    if (this.model.fromDate == '' || this.model.toDate == '') 
    {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    } 
    if((this.model.fromDate != '' && this.model.toDate !='') && (this.model.toDate) < (this.model.fromDate)){
      this.toast.error('To Date must be greater than From Date.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }
    if(this.model.fromDate && this.model.toDate){
      for(let i = 0; i< this._userlogin.length; i++){
        if(this._userlogin[i].login_id > filter.from && this._userlogin[i].login_id < filter.to ){
          filteredloginActions.push(this._userlogin[i]);
        }
      }
    }else{
      filteredloginActions = this._userlogin;
    }
    this.userlogin = filteredloginActions;
  } 


  onSubmit(){

  }
  
}
