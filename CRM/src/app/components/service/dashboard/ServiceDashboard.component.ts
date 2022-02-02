import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ServiceDashboard-component',
  templateUrl: './ServiceDashboard.component.html',
  styleUrls: ['./ServiceDashboard.component.css']
})
export class ServicedashboardComponent extends DynamicComponent implements OnInit {




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
    else{
      this._dbService.getAllGlobalSearchServiceByDate(this.filter.from, this.filter.to, page)
      .subscribe((response: any) => {
        // console.log(response);
        if (response && response.data) {
          this.filteredTotalCustomers = response.data.totalCustomers;
          this.filteredTotalFaq = response.data.totalFaq;
          this.filteredTotalUsers = response.data.totalUsers;
          this.totalCustomerCount = response.data.totalCustomersCount;
          this.totalFAQCount = response.data.totalFaqCount;
          this.totalUsersCount = response.data.totalUsersCount;
          this.filterFlagEnabled = true;
        }
      });
    }
    
    //  this.filteredTotalCustomers = this.totalcustomers.filter(item => item.created_time > filter.from && item.created_time < filter.to);
    //  this.filteredUsers = this.totalusers.filter(item => item.created_time > filter.from && item.created_time < filter.to);
    //  this.filteredTotalFaq = this.totalfaq.filter(item => item.created_time > filter.from && item.created_time < filter.to);


  }

  pageChanged(data, event) {
    // console.log("Iam data", data, event);

    if (data == "faq") {
      this._dbService.getAllGlobalSearchServiceByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredTotalFaq = res.data.totalFaq
      })
    }

    else if (data == "customers")
      this._dbService.getAllGlobalSearchServiceByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        // console.log("result", res)
        this.filteredTotalCustomers = res.data.totalCustomers
      })

    else if (data == "users")
      this._dbService.getAllGlobalSearchServiceByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredTotalUsers = res.data.totalUsers
      })


  }

  onClickEdit(data, obj) {
    if (data == "customers")
    this._router.navigate(['/service/customers', obj.object_id]);
    else if (data == "users")
      this._router.navigate(['/ogoul/adduserpage', obj.user_id]);
    else
      this._router.navigate(['/service/servicefaq', obj.faq_id]);
  }

  async onClickDelete(data, obj) {
    if (data == "customers") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "users") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteUser(obj).toPromise();
        await this.filterData();
      }
    }
    else {
      if (confirm("Are you sure to delete " + obj.questions)) {
        await this._dbService.deleteFaqs(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

  }

  sortCustomers(id){

  }

  sort(id){}

}
