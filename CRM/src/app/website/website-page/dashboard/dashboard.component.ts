import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends DynamicComponent implements OnInit {




  filteredTotalCustomers = [];
  filteredTotalFaq = [];
  filteredTotalUsers = [];
  totalcases = 0;
  totalcustomers = 0;
  totalfaq = 0;
  totalusers = 0;
  email: any;
  key: string = 'id';
  reverse: boolean = false;
  customerPagination: number = 1;
  usersPagination:number = 1;
  faqPagination:number = 1;
  model: any = {
    fromDate: '',
    toDate: ''
  }
  filter: any = {
    from: 0,
    to: 0,
  };
  filterFlagEnabled: boolean;
  totalFAQCount: number = 0;
  totalUsersCount: number = 0;
  totalCustomerCount: number = 0;

  constructor(public _uiService: UiService, injector: Injector,private toast: ToastrService,
     private _router: Router) {
    super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_DASHBOARD, injector);
  }


  async ngOnInit() {
    await this.populateFields();
    let result = await this._dbService.dashboardSearch().toPromise();
    // console.log("DASH RESH....:", result["data"]);
    let dashObj = result["data"];
    this.totalfaq = dashObj.totalfaq;
    this.totalcustomers = dashObj.totalcustomers;
    this.totalusers = dashObj.totalusers;
    // this.filteredTotalCases =dashObj.totalcases;
    // this.filteredTotalCustomers =dashObj.totalcustomers;
    // this.filteredTotalFaq =dashObj.totalfaq;
    // this.filteredUsers =dashObj.totalusers;
    setTimeout(() => { }, 1);
  }

  filterData = async () => {
    this.filter = {
      from: new Date(this.model.fromDate).getTime(),
      to: new Date(this.model.toDate).getTime() + 86400000,
    };
    let page = 1;
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
   
    
    //  this.filteredTotalCustomers = this.totalcustomers.filter(item => item.created_time > filter.from && item.created_time < filter.to);
    //  this.filteredUsers = this.totalusers.filter(item => item.created_time > filter.from && item.created_time < filter.to);
    //  this.filteredTotalFaq = this.totalfaq.filter(item => item.created_time > filter.from && item.created_time < filter.to);


  }

  

 



  sortCustomers(id){

  }

  sort(id){}

}
