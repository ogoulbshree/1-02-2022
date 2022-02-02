import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';

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

  constructor( 
    private datePipe: DatePipe,injector: Injector) { 
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
  }
  filterloginActions(){
    let filteredloginActions = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  // end of the day timestamp
    };
    if(this.fromDate && this.toDate){
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

}
