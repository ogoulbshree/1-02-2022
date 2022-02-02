import { Component, ElementRef, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalserviceService } from '../../globalservice.service';

import { DBService } from 'src/app/services/dbservice.service'
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { GlobalService } from 'src/app/services/global.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
/* import { MenuItems } from '../../shared/menu-items/menu-items'; */
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesComponent } from '../hrms/employees/employees.component';
import { ProjectsComponent } from '../hrms/projects/projects.component';
import { HolidaysComponent } from '../hrms/holidays/holidays.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends DynamicComponent implements OnInit {
  @ViewChild('filterName', { static: false }) filterName;
  @ViewChild('filterNameMarketing', { static: false }) filterNameMarketing;
  @ViewChild('filterNameService', { static: false }) filterNameService;
  @ViewChild('filterNameInventory', { static: false }) filterNameInventory;
  @ViewChild('filterNameHrms1', { static: false }) filterNameHrms1;
  clicked = false;
  PICKLIST_PREFERRED_LANGUAGE_ARRAY = GlobalConstants.ARRAY_PREFERRED_LANGUAGE;
  preferred_language = GlobalConstants.PREFERRED_LANGUAGE.ENGLISH;
  PICKLIST_USER_TYPES_ARRAY: any;
  isCollapsed = false;
  isMenuCollapse =true;
  //flags to show
  flagShowActivityManagement = true;
  flagShowogoul = true;
  flagShowInventory = true;
  flagShowSettings = true;
  flagShowmarketing = true;
  flagShowsales = true;
  flagShowservice = true;
  flagShowUsers = true;
  flagShowhrms = true;
  flagShowEmyloyee = true;
  flagShowProject = true;
  flagShowSettingsHrms = true;
  flagShowWebsite = true;
  flagShowhelpdesk =true;
  searchTerm: string = "";
  currentDashboard = 'sales';

  lang: string = "";
  email: any;
  marketingUsers: any;
  keyword = 'global_search';
  searchResultsSales;
  searchResultsMarketing;
  searchResultsService;
  searchData = "";
  CustomerUsers;
  searchResultsInventory: any;
  searchResultsHrms: any;
  noDataErrorFlag: boolean = false;
  noEntryFoundErrorFlag: boolean = false;
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    public _uiservice: UiService,
    /*    public menuItems: MenuItems, */
    private translate: TranslateService,
    private _router: Router,
    private globalSearchService: GlobalserviceService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _globalService: GlobalService, injector: Injector) {
    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_PRODUCT, injector)
  }

  async init() {

    if (
      /*     this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales */
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Admin ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowservice = true;
      this.flagShowmarketing = true;
      this.flagShowsales = true;
      this.flagShowInventory = true;
      this.flagShowWebsite = false;
      this.flagShowhrms = true;
      this.currentDashboard = "sales";
      GlobalConstants.CURRENT_MODULE = "sales";

    }




    else if (
      /*     this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales */

      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Manager) {
      this.flagShowSettings = true;
      this.flagShowhrms = true;
      this.flagShowWebsite = false;
      this.flagShowogoul = false;
      this.flagShowservice = true;
      this.flagShowmarketing = true;
      this.flagShowsales = true;
      this.flagShowInventory = true;
      this.flagShowSettingsHrms = true
      this.flagShowhrms = true;
      this.currentDashboard = "hrms";
      GlobalConstants.CURRENT_MODULE = "hrms";

    }

    else if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales) {
      this.flagShowSettings = false;
      this.flagShowhrms = false;
      this.flagShowogoul = false;
      this.flagShowsales = true;
      this.flagShowWebsite = false;
      this.flagShowservice = true;
      this.flagShowmarketing = true;
      this.flagShowInventory = true;
      this.currentDashboard = "sales";
      GlobalConstants.CURRENT_MODULE = "sales";

    }





    else if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowSettingsHrms = false;
      this.flagShowsales = true;
      this.flagShowservice = false;
      this.flagShowmarketing = false;
      this.flagShowWebsite = false;
      this.flagShowInventory = false;
      this.flagShowProject = false
      this.flagShowEmyloyee = false;
      this.currentDashboard = "sales";
      GlobalConstants.CURRENT_MODULE = "sales";

    }






    else if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowmarketing = true;
      this.flagShowWebsite = false;
      this.flagShowInventory = false;
      this.currentDashboard = "marketing";
      GlobalConstants.CURRENT_MODULE = "marketing";

    }

    else if (

      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User) {
      this.flagShowSettings = false;
      this.flagShowogoul = false;
      this.flagShowsales = true;
      this.flagShowservice = false;
      this.flagShowmarketing = false;
      this.flagShowWebsite = false;
      this.flagShowInventory = false;
      this.flagShowProject = false
      this.flagShowEmyloyee = false;
      this.currentDashboard = "sales";
      GlobalConstants.CURRENT_MODULE = "sales";


    }





    else if (

      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_User) {
      this.flagShowSettings = false;
      this.flagShowSettingsHrms = false;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowWebsite = false;
      this.flagShowservice = false;
      this.flagShowmarketing = false;
      this.flagShowhrms = true;
      this.flagShowInventory = false;
      this.currentDashboard = "hrms";
      GlobalConstants.CURRENT_MODULE = "hrms";

    }


    else if (

      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User) {
      this.flagShowSettings = false;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowWebsite = false;
      this.flagShowmarketing = true;
      this.flagShowInventory = false;
      this.currentDashboard = "marketing";
      GlobalConstants.CURRENT_MODULE = "marketing";

    }


    else if (

      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User) {
      this.flagShowSettings = false;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowWebsite = false;
      this.flagShowmarketing = false;
      this.flagShowInventory = true;
      this.currentDashboard = "inventory";
      GlobalConstants.CURRENT_MODULE = "inventory";

    }

    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Admin) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowWebsite = false;
      this.flagShowmarketing = false;
      this.flagShowInventory = true;
      this.currentDashboard = "inventory";
      GlobalConstants.CURRENT_MODULE = "inventory";

    }
    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Admin) {
      this.flagShowSettings = true;
      this.flagShowogoul = true;
      this.flagShowWebsite = true;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowmarketing = false;
      this.flagShowInventory = false;
      this.currentDashboard = "website-page";
      GlobalConstants.CURRENT_MODULE = "website-page";
    }
    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowWebsite = false;
      this.flagShowservice = false;
      this.flagShowmarketing = false;
      this.flagShowInventory = true;
      this.currentDashboard = "inventory";
      GlobalConstants.CURRENT_MODULE = "inventory";

    }


    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Admin) {
      this.flagShowSettings = true;
      this.flagShowSettingsHrms = false;
      this.flagShowogoul = false;
      this.flagShowsales = true;
      this.flagShowInventory = false;
      this.flagShowWebsite = false;
      this.flagShowservice = false;
      this.flagShowmarketing = false;
      this.flagShowProject = false
      this.flagShowEmyloyee = false;
      this.currentDashboard = "sales";
      GlobalConstants.CURRENT_MODULE = "sales";

    }
    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Admin) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowWebsite = false;
      this.flagShowmarketing = true;
      this.flagShowInventory = false;
      this.currentDashboard = "marketing";
      GlobalConstants.CURRENT_MODULE = "marketing";

    }

    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Admin) {
      this.flagShowSettingsHrms = true;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowWebsite = false;
      this.flagShowmarketing = false;
      this.flagShowInventory = false;
      this.flagShowhrms = true;
      this.currentDashboard = "hrms";
      GlobalConstants.CURRENT_MODULE = "hrms";

    }

    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Admin) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = true;
      this.flagShowWebsite = false;
      this.flagShowmarketing = false;
      this.flagShowInventory = false;
      this.currentDashboard = "service";
      GlobalConstants.CURRENT_MODULE = "service";

    }
    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager) {
      this.flagShowSettings = true;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = true;
      this.flagShowWebsite = false;
      this.flagShowmarketing = false;
      this.flagShowInventory = false;
      this.currentDashboard = "service";
      GlobalConstants.CURRENT_MODULE = "service";

    }
    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User) {
      this.flagShowSettings = false;
      this.flagShowogoul = false;
      this.flagShowsales = false;
      this.flagShowservice = true;
      this.flagShowWebsite = false;
      this.flagShowInventory = false;
      this.flagShowmarketing = false;
      this.currentDashboard = "service";
      GlobalConstants.CURRENT_MODULE = "service";

    }


    else if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Ogoul_User ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Service ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Sales) {
      this.flagShowSettings = false;
      this.flagShowUsers = false
      this.flagShowogoul = true;
      this.flagShowInventory = false;
      this.flagShowsales = false;
      this.flagShowWebsite = false;
      this.flagShowservice = false;
      this.flagShowmarketing = false;
      this.currentDashboard = "ogoul";
      GlobalConstants.CURRENT_MODULE = "ogoul";

    }

    else if (
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Admin ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Manager) {
      this.flagShowSettings = true;
      this.flagShowogoul = true;
      this.flagShowsales = false;
      this.flagShowservice = false;
      this.flagShowWebsite = true;
      this.flagShowmarketing = false;
      this.flagShowInventory = false;
      this.currentDashboard = "ogoul";
      GlobalConstants.CURRENT_MODULE = "ogoul";

    }
    // console.log("CHanging dashboard to : ", this.currentDashboard);

    this.currentDashboard = GlobalConstants.CURRENT_DASHBOARD;
  }
  onFocused(e) {

    //   this._dbService.getGlobalSearchMarketing().subscribe((customer)=>{
    //     console.log("I am customer users ",customer);
    //     this.marketingUsers=customer["data"];
    // });
  }
  selectEvent(type, item) {
    // do something with selected item
    if (type == "sales") {
      if (item.object_type && item.object_type == 3)
        this._router.navigate(['/sales/addcustomer', item.object_id]);
      else if (item.object_type && item.object_type == 2)
        this._router.navigate(['/sales/leads', item.object_id]);

    }
    else if (type == "service") {
      if (item.questions)
        this._router.navigate(['/service/servicefaq', item.faq_id]);
      else
        this._router.navigate(['/service/customers', item.object_id])

    }
    else if (type == "marketing") {
      if (item.first_name)
        this._router.navigate(['/marketing/addcontact', item.object_id]);
      else if (item.campaign_id)
        this._router.navigate(['/marketing/campaigns', item.campaign_id]);

    }
    else if (type == "inventory") {
      if (item.purchase_id)
        this._router.navigate(['/inventory/purchases', item.purchase_id]);
      else if (item.return_id)
        this._router.navigate(['/inventory/return', item.return_id]);
      else if (item.invoice_id)
        this._router.navigate(['/inventory/invoice', item.invoice_id]);

    }
    else {

      if (item.project_id) {
        const dialogRef = this.dialog.open(ProjectsComponent);
        dialogRef.componentInstance.project_id = item.project_id;
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      }
      else if (item.holiday_id) {
        const dialogRef = this.dialog.open(HolidaysComponent);
        dialogRef.componentInstance.holiday_id = item.holiday_id;
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      }
      else if (item.employee_id) {
        const dialogRef = this.dialog.open(EmployeesComponent);
        dialogRef.componentInstance.employee = item.employee_id;
        dialogRef.afterClosed().subscribe(result => {
          // if (result)
          this.ngOnInit();
        });
      }
    }

  }

  async ngOnInit() {
    this.clicked = true;

    // this._dbService.getAllGlobalSearchData().subscribe((customer)=>{
    //   // console.log("I am customer users ",customer);
    //   this.CustomerUsers=customer["data"];
    // });

    // this._dbService.getGlobalSearchMarketing().subscribe((user)=>{
    //   console.log("I am marketing  users ",user);
    //   this.marketingUsers=user["data"];
    // })
    // CustomLogger.logString("About to check for login");

    this._globalService.setPreferredLanguage(this.preferred_language);
    await this.init();
    this._uiservice.updateSessionUser();
    this._uiservice.userValue.subscribe(user => {
      this.email = user['email'];
    });
  }
  onChangeDashboradType(ev) {
    //  console.log("ev.target:::", ev.target.value);
    GlobalConstants.CURRENT_DASHBOARD = ev.target.value;
    GlobalConstants.CURRENT_MODULE = ev.target.value;
    GlobalConstants.OGOUL_DASHBOARD = ev.target.value;
    GlobalConstants.INVENTORY_DASHBOARD = ev.target.value;
    GlobalConstants.HRMS_DASHBOARD = ev.target.value;
    this.noEntryFoundErrorFlag = false;
    this.noDataErrorFlag = false
    if (ev.target.value == "sales") {
      this._router.navigateByUrl('sales/dashboard');
    } else if (ev.target.value == "marketing") {
      this._router.navigateByUrl('marketing/marketingdashboard');
    }
    else if (ev.target.value == "service") {
      //console.log("Will route to service...");
      this._router.navigateByUrl('service/dashboard');
    }
    else if (ev.target.value == "inventory") {
      //console.log("Will route to service...");
      this._router.navigateByUrl('inventory/dashboard');
    }
    else if (ev.target.value == "hrms") {
      this._router.navigateByUrl('hrms/dashboard');
    }
    else if (ev.target.value == "ogoul") {
      this._router.navigateByUrl('ogoul/dashboard');
    }

    else if (ev.target.value == "helpdesk") {
      this._router.navigateByUrl('helpdesk/dashboard');
    }



    this.currentDashboard = GlobalConstants.CURRENT_DASHBOARD;
    this._uiservice.setdashboardType(ev.target.value);
  }

  myLanguage = GlobalConstants.CURRENT_SELECTED_LANGUAGE;
  async onLanguageSelect(ev) {
    // console.log("ev.target;;;;;;;", ev.target);
    ///console.log("ev.target.value;;;;;;;", ev.target.value);
    this.currentDashboard = GlobalConstants.CURRENT_DASHBOARD;
    // console.log("this.currentDashboard:::", this.currentDashboard);
    GlobalConstants.CURRENT_SELECTED_LANGUAGE = ev.target.value;
    this.myLanguage = GlobalConstants.CURRENT_SELECTED_LANGUAGE;
    this.translate.use(ev.target.value);
    this._uiservice.langDataSource.next(ev.target.value);
    await this.populateFields();
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this._route });

  }
  onInput(event: any) {
    // this pushes the input value into the service's Observable.
    this.globalSearchService.searchTerm.next(event.target.value);
  }

  logout() {
    //localStorage.clear();
    this._router.navigate(["/website/home"]);
    let user_id;
    let email;
    let files;
    this._uiservice.userValue.subscribe(val => {
      user_id = val.user_id;
      email = val.email;
      files = val.files
    })
    this._dbService.logout({ user_id: user_id, email: email }).subscribe(res => { })
  }


  onChangeSearch(data: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.searchData = data;
    // console.log(this.searchData)
  }

  onSearchByWord(word, data) {
    let noRecords = [{
      global_search: "No Records Found",

    }]
    // console.log("this.searchData", this.searchData, "data", data)
    if (this.searchData) {
      this.noDataErrorFlag = false;
      if (data == "sales" && this.searchData) {
        this._dbService.getAllGlobalSearchSalesByKeyword(this.searchData).subscribe((customer) => {
          console.log("I am customer users ", customer);
          this.filterName.isOpen = true;
          if (customer["data"].length > 0) {
            this.searchResultsSales = customer["data"];
            this.noEntryFoundErrorFlag = false;
          }
          else
            this.noEntryFoundErrorFlag = true;
        });
      }
      else if (data == "service" && this.searchData) {
        this._dbService.getAllGlobalSearchServiceByKeyword(this.searchData).subscribe((customer) => {
          console.log("I am service users ", customer,);
          this.filterNameService.isOpen = true;
          if (customer["data"].length > 0)
            if (customer["data"].length > 0) {
              this.searchResultsService = customer["data"];
              this.noEntryFoundErrorFlag = false;
            }
            else
              this.noEntryFoundErrorFlag = true;
        });
      }
      else if (data == "marketing" && this.searchData) {
        this._dbService.getAllGlobalSearchMarketingByKeyword(this.searchData).subscribe((customer) => {
          console.log("I am marketing users ", customer,);
          this.filterNameMarketing.isOpen = true;
          if (customer["data"].length > 0) {
            this.searchResultsMarketing = customer["data"];
            this.noEntryFoundErrorFlag = false;
          }
          else {
            this.noEntryFoundErrorFlag = true;
          }
        });
      }
      else if (data == "inventory" && this.searchData) {
        this._dbService.getAllGlobalSearchInventoryByKeyword(this.searchData).subscribe((item) => {
          console.log(item);

          this.filterNameInventory.isOpen = true;
          if (item["data"].length > 0)
            this.searchResultsInventory = item["data"];
          else
            this.searchResultsInventory = noRecords
        });
      }
      else {
        this._dbService.getAllGlobalSearchHrmsByKeyword(this.searchData).subscribe((customer) => {
          console.log(customer);

          this.filterNameHrms1.isOpen = true;
          if (customer["data"].length > 0) {
            this.searchResultsHrms = customer["data"];
            this.noEntryFoundErrorFlag = false;
          }

          else {
            this.noEntryFoundErrorFlag = true;
          }
        });
      }
    }

    else {
      this.noDataErrorFlag = true;
      this.noEntryFoundErrorFlag = false;
    }
  }
  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
