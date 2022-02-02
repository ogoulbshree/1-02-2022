import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'sales-dashboard-component',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent extends DynamicComponent implements OnInit {


  totalproducts = 0;
  totalcustomers = 0;
  totaldeals = 0;
  totalusers = 0;
  totalquotes = 0;
  totalleads = 0;
  totaladdvisits = 0;
  totalshchedulevisits = 0;
  email: any;
  fromDate;
  toDate;
  displayValue: string;
  p: number = 1;
  model: any = {
    fromDate: "",
    toDate: ""
  };
  page;
  key: string = 'id';
  reverse: boolean = false;
  username;
  usertype;
  scheduleVisitPagination: number = 1;
  visitsPagination: number = 1;
  leadsPagination: number = 1;
  usersPagination: number = 1;
  quotesPagiantion: number = 1;
  productsPagiantion: number = 1;
  dealsPagination: number = 1;
  customerPagination: number = 1;
  totalScheduleCount: number = 0;
  totalCustomersCount: number = 0;
  totalDealsCount: number = 0;
  totalQuotesCount: number = 0;
  totalUsersCount: number = 0;
  totalAddVisitsCount: number = 0;
  totalLeadsCount: number = 0;
  totalProductsCount: number = 0;
  filter: any = {
    from: 0,
    to: 0,
  };
  filteredScheduleVisits: [];
  filterFlagEnabled: boolean = false;
  filteredLeads: [];
  filteredCustomers: [];
  filteredProducts: [];
  filteredDeals: [];
  filteredQuotes: [];
  filteredTotalUsers: [];
  filteredAddVisits: [];
  constructor( private toast: ToastrService, public _uiservice: UiService, private toastyService: ToastyService, injector: Injector, private _router: Router) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_DASHBOARD, injector);
   
  }

  async ngOnInit() {

    await this.populateFields();
    let result = await this._dbService.dashboardSearch().toPromise();
    // console.log("DASH RESH....:", result["data"]);
    let dashObj = result["data"];

    this._uiservice.userValue.subscribe(data => {
      this.username = data['username'];
      this.usertype = data['usertype'];
    })





    // this.filteredLeads=dashObj.totalleads;
    this.totalleads = dashObj.totalleads;
    // this.filteredCustomers = dashObj.totalcustomers;
    this.totalcustomers = dashObj.totalcustomers;
    // this.filteredProducts = dashObj.totalproducts;
    this.totalproducts = dashObj.totalproducts;
    // this.filteredDeals = dashObj.totaldeals;
    this.totaldeals = dashObj.totaldeals;
    // this.filteredQuotes= dashObj.totalquotes;
    this.totalquotes = dashObj.totalquotes;
    // this.filteredTotalUsers = dashObj.totalusers;
    this.totalusers = dashObj.totalusers;
    // this.filteredAddVisits = dashObj.totaladdvisits;
    this.totaladdvisits = dashObj.totaladdvisits;
    // this.filteredScheduleVisits = dashObj.totalshchedulevisits;
    this.totalshchedulevisits = dashObj.totalshchedulevisits;

    let assignedVisits = [];
    //after delete update the table, getAllVisit and update 
    this._dbService.getAllScheduleVisits(1).subscribe(res => {

      //show all scheduled visits to admin and manager
      if (this.usertype == 'Super Admin' || this.usertype == ' Super Manager') {
        this.filteredScheduleVisits = res.results;
      } else {
        //show all scheduled visits of a logged in user, if user is not manager or Admin
        res.results.forEach(scheduleVisit => {
          if (scheduleVisit.sales_username == this.username) {
            assignedVisits.push(scheduleVisit);
          }
        });
        this.filteredScheduleVisits = res.results;
      }

    });





  }

  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names += productArr[k].product_name;
      if (k < (productArr.length - 1)) names += ",";
    }
    return names + "]";
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
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, page)
      .subscribe((response: any) => {
        if (response && response.data) {
          this.filteredLeads = response.data.totalleads;
          this.totalLeadsCount = response.data.totalLeadsCount;
          this.filteredCustomers = response.data.totalcustomers;
          this.totalCustomersCount = response.data.totalCustomersCount;
          this.filteredProducts = response.data.totalproducts;
          this.totalProductsCount = response.data.totalProductsCount;
          this.filteredDeals = response.data.totaldeals;
          this.totalDealsCount = response.data.totalDealsCount;
          this.filteredQuotes = response.data.totalquotes;
          this.totalQuotesCount = response.data.totalQuotesCount;
          this.filteredTotalUsers = response.data.totalusers;
          this.totalUsersCount = response.data.totalUsersCount;
          this.filteredAddVisits = response.data.totaladdvisits;
          this.totalAddVisitsCount = response.data.totalAddVisitsCount;
          this.filteredScheduleVisits = response.data.totalschedulevisits;
          this.totalScheduleCount = response.data.totalScheduleCount;
          this.filterFlagEnabled = true;
        }
      });
    }
  }
  pageChanged(data, event) {
    if (data == "schedule")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredScheduleVisits = res.data.totalschedulevisits
      })
    else if (data == "customers")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredCustomers = res.data.totalcustomers
      })
    else if (data == "deals")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredDeals = res.data.totaldeals
      })
    else if (data == "products")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredProducts = res.data.totalproducts
      })
    else if (data == "users")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredTotalUsers = res.data.totalusers
      })

    else if (data == "leads")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredLeads = res.data.totalleads
      })

    else if (data == "quotes")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredQuotes = res.data.totalquotes
      })
    else if (data == "addVisit")
      this._dbService.getAllGlobalSearchSalesByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredAddVisits = res.data.totaladdvisits
      })
  }

  onClickEdit(data, obj) {
    if (data == "schedule")
      this._router.navigate(['/sales/shedulevisits', obj.schedule_visit_id]);
    else if (data == "customers")
      this._router.navigate(['/sales/addcustomer', obj.object_id]);
    else if (data == "deals")
      this._router.navigate(['/sales/salesdeals', obj.deal_id]);
    else if (data == "products")
      this._router.navigate(['sales/products/createproducts', obj.product_id]);
    else if (data == "users")
      this._router.navigate(['/sales/settings/adduser', obj.user_id]);

    else if (data == "leads")
      this._router.navigate(['/sales/leads', obj.object_id]);

    else if (data == "quotes")
      this._router.navigate(['sales/createquotation', obj.quote_id]);
    else if (data == "addVisit")
      this._router.navigate(['/sales/addvisits', obj.visit_id]);
  }
  showAlert(msg, type) {
    var toastOptions: ToastOptions = {
      title: type,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        //console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    if (type == "success") {
      this.toastyService.success(toastOptions);
    } else if (type == "failed") {
      this.toastyService.error(toastOptions);
    } else {
      this.toastyService.warning(toastOptions);
    }
  }

  async onClickDelete(data, obj) {
    if (data == "schedule") {
      if (confirm("Are you sure to delete this visit")) {
        this._dbService.deleteScheduleVisit({ schedule_visit_id: obj.schedule_visit_id }).subscribe(res => {
          let type = res.status == 200 ? 'success' : 'failed'
          this.showAlert(res.message, type);
        });
        await this.filterData();
      }
    }
    else if (data == "customers") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "deals") {
      if (confirm("Are you sure to delete " + obj.deal_name)) {
        await this._dbService.deleteDeal(obj).toPromise();
        // console.log(" delete functionality ");
        await this.filterData();
      }
    }
    else if (data == "products") {
      if (confirm("Are you sure to delete " + obj.product_name)) {
        await this._dbService.deleteProduct(obj).toPromise();
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

    else if (data == "leads") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        // console.log(" delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "quotes") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteQuote(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "addVisits") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        this._dbService.deleteVisit({ visit_id: obj.visit_id }).subscribe(res => {
          let type = res.status == 200 ? 'success' : 'failed'
          this.showAlert(res.message, type);
        });

        await this.filterData();
      }
    }
  }


  displayFn(id){

  }
  sortCustomers(id){

  }
  sort(id){
    
  }


}
