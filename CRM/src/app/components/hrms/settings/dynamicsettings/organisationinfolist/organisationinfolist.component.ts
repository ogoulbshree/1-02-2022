import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-organisationinfolist',
  templateUrl: './organisationinfolist.component.html',
  styleUrls: ['./organisationinfolist.component.css']
})
export class OrganisationinfolistComponent extends DynamicComponent implements OnInit {



  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector,public _uiservice: UiService) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ORGANISATIONS_INFO_LIST,injector);
   }
  isUpdate = false;
  departmentDetail: DepartmentDetail;
  filteredTableDataArr: any;
  organisationDataArr = [];
  searchText;
  organisation_name;
  filterQuery = ""
  rowsOnPage = 5;
  key: string = 'id'
  reverse: boolean = false;
  p: number = 1;
  fromDate;
  toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  departmentDetailsCount: number = 0;
  async init() {

    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||

      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    ) {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

    }


    this.CAN_ADD = false;
    let result = await this._dbService.getAllOrganisationInfo(1).toPromise();
    // console.log("result:", result);
    this.organisationDataArr = result["results"];
    this.filteredTableDataArr = this.organisationDataArr;
    this.departmentDetailsCount = result["count"];

  }
  async ngOnInit() {
    await this.populateFields();
    await this.init();
  }



  onClickEdit(obj) {
    this._router.navigate(['hrms/settings/dynamicsettings/orginfo', obj.orginfo_id]);
  }





  async onClickDelete(obj) {
    if (confirm("Are you sure to delete " + obj.orginfo_name)) {
      await this._dbService.deleteOrganisationInfo(obj).toPromise();
      // console.log("Implement delete functionality here");
      await this.init();
    }
  }





  filterData() {
    let organisationDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,
    };

    /*   console.log("this.fromDate::::", this.fromDate);
      console.log("this.toDate::::", this.toDate);
      console.log("filter.from::::", filter.from);
      console.log("filter.to::::", filter.to);
     */
    if (this.fromDate && this.toDate) {
      for (let i = 0; i < this.organisationDataArr.length; i++) {
        // console.log("this.organisationDataArr[i].created_time::::", this.organisationDataArr[i].created_time);
        if (this.organisationDataArr[i].created_time > filter.from && this.organisationDataArr[i].created_time < filter.to) {
          organisationDataArr.push(this.organisationDataArr[i]);
        }
      }
    } else {
      organisationDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = organisationDataArr;
  }

  pageChanged(data, event) {
    // console.log(data, event);
    this._dbService.getAllDepartment(event).subscribe((res: any) => {
      // console.log(res)

      this.organisationDataArr = res.results

      this.filteredTableDataArr = this.organisationDataArr;
    })

  }

  searchData(type) {

    if (type == 'clear' && !this.organisation_name) this.ngOnInit();

    else if (type == 'search')
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.organisation_name, 'organisationInfo').subscribe((x: any) => {
        this.filteredTableDataArr = x.data;
      });


  }
  sort(id) {

  }

}
