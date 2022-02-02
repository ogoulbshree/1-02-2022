import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-marketingdashboard',
  templateUrl: './marketingdashboard.component.html',
  styleUrls: ['./marketingdashboard.component.css']
})
export class MarketingdashboardComponent extends DynamicComponent implements OnInit {


  totalcontacts = 0;
  totalcustomers = 0;
  totalleads = 0;
  totalcampaigns = 0;
  totalactivity = 0;
  totalusers = 0;
  reverse: boolean = false;
  key: string = 'id';
  customerPagination: number = 1;
  leadsPagination: number = 1;
  usersPagination: number = 1;
  contactsPagination:number = 1;
  activityPagination:number = 1;
  email: any;
  model: any = {
    fromDate: "",
    toDate: ""
  };
  filter: any = {
    from: 0,
    to: 0,
  };
  filterFlagEnabled: boolean = false;
  filteredLeads: [];
  filteredCampaigns: [];
  filteredTotalUsers: [];
  filteredActivity: [];
  filteredCustomers: [];
  filteredContacts: [];
  totalLeadsCount: number = 0;
  totalCampaignsCount: number = 0;
  totalUsersCount: number = 0;
  totalActivitiesCount: number = 0;
  totalCustomersCount: number = 0;
  totalContactsCount: number = 0;
  campaignsPagination: number = 1;
  rowsOnPage = 5;
  searchText;
  attachmenstsData: any
  constructor(public _uiService: UiService,private toast: ToastrService, private _router: Router, injector: Injector,) {
    super(GlobalConstants.COMPONENT_NAME.MARKETING_DASHBOARD, injector);
  }



  async ngOnInit() {
    await this.populateFields();

    let result = await this._dbService.dashboardSearch().toPromise();
    //console.log("DASH RESH....:", result["data"]);
    let dashObj = result["data"];
    this.totalcontacts = dashObj.totalcontacts;
    this.totalleads = dashObj.totalleads;
    this.totalcustomers = dashObj.totalcustomers;
    this.totalcampaigns = dashObj.totalcampaigns;
    this.totalactivity = dashObj.totalactivity;
    this.totalusers = dashObj.totalusers;



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
      this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, page)
            .subscribe((response: any) => {
              // console.log("I am res", response);

              if (response && response.data) {
                this.filteredLeads = response.data.totalLeads;
                this.totalLeadsCount = response.data.totalLeadsCount;
                this.filteredCampaigns = response.data.totalCampaigns;
                this.totalCampaignsCount = response.data.totalCampaignsCount;
                this.filteredTotalUsers = response.data.totalUsers;
                this.totalUsersCount = response.data.totalUsersCount;
                this.filteredActivity = response.data.totalActivities;
                this.totalActivitiesCount = response.data.totalActivitiesCount;
                this.filteredCustomers = response.data.totalCustomers;
                this.totalCustomersCount = response.data.totalCustomersCount;
                this.filteredContacts = response.data.totalContacts;
                this.totalContactsCount = response.data.totalContactsCount;

                this.filterFlagEnabled = true;
              }
            });
    }
    
   
  }
  onClickEdit(data, obj) {
    if (data == "customers")
      this._router.navigate(['/marketing/addcustomer', obj.object_id]);
    else if (data == "users")
      this._router.navigate(['/marketing/settings/adduser', obj.user_id]);
    else if (data == "leads")
      this._router.navigate(['/marketing/leads', obj.object_id]);
    else if (data == "activity")
      this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
    else if (data == "campaigns")
      this._router.navigate(['/marketing/campaigns', obj.campaign_id]);
    else if (data == "contacts")
      this._router.navigate(['/marketing/addcontact', obj.object_id]);
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
      if (confirm("Are you sure to delete " + obj.usertype)) {
        await this._dbService.deleteUser(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "leads") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        // console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "activity") {
      if (confirm("Are you sure to delete " + obj.record_type)) {
        await this._dbService.deleteActivity(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "campaigns") {
      if (confirm("Are you sure to delete " + obj.campaign_owner)) {
        await this._dbService.deleteCampaign(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "contacts") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteCustomer(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

  }
  pageChanged(data, event) {
    // if (data == "schedule")
    //   this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
    //     this.filteredScheduleVisits = res.data.totalschedulevisits
    //   })
    if (data == "customers")
      this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredCustomers = res.data.totalCustomers
      })
    else if (data == "contacts")
      this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredContacts = res.data.totalContacts
      })
    else if (data == "activity")
      this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredActivity = res.data.totalActivities
      })
    else if (data == "users")
      this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredTotalUsers = res.data.totalUsers
      })

    else if (data == "leads")
      this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredLeads = res.data.totalLeads
      })

    else if (data == "campaigns")
      this._dbService.getAllGlobalSearchMarketingByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.filteredCampaigns = res.data.totalCampaigns
      })

  }

  sortCustomers(id){

  }
  sort(id){

  }

}
