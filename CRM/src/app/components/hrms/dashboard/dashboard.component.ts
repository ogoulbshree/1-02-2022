import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { EmployeesComponent } from '../employees/employees.component';
import { HolidaysComponent } from '../holidays/holidays.component';
import { LeavesComponent } from '../leaves/leaves.component';
import { ProjectsComponent } from '../projects/projects.component';
import { TrainingsComponent } from '../trainings/trainings.component';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends DynamicComponent implements OnInit {
  //Arrays
  employeeArray = [];
  holidayArr = [];
  leaveArr = [];
  candidateArr = [];
  projectArr = [];
  trainingArr = [];
  expenseArr = [];
  policyArr = [];
  interviewArr=[]
  filterFlagEnabled: Boolean;
  employeeCount: number = 0;
  leaveCount: number = 0;
  holidayCount: number = 0;
  trainingCount: number = 0;
  candidateCount: number = 0;
  noticeCount: number = 0;
  projectCount: number = 0;
  
  totalEmployeesCount: number = 0;
  employeePagination: number = 1;
  holidaysPagination: number = 1;
  totalHolidaysCount: number = 0;
  leavesPagination: number = 1;
  trainingPagination: number = 1;
  projectPagination: number = 1;
  noticePagination: number = 1;
  expensePagination: number = 1;
  policyPagination: number = 1;
  candidatePagination: number = 1;
  totalLeavesCount: number = 0;
  candidateArrCount: number = 0;
  noticeArrCount: number = 0;
  designationDetail: any;
  
  noticeArr;
  employeeArrCount: number = 0;
  leaveArrCount: number = 0;
  trainingArrCount: number = 0;
  projectArrCount: number = 0;
  holidayArrCount: number = 0;

	
  expenseArrCount: number = 0;
  policyArrCount: number = 0;
  interviewArrCount:number=0;
  reverse: boolean = true;
  key: string = 'id';
  policyCount:number=0;
  expenseCount:number=0;
  constructor(public _uiservice: UiService, public dialog: MatDialog, injector: Injector, private toast: ToastrService,
    private _router: Router) { super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DASHBOARD, injector); }
  model = {
    fromDate: '',
    toDate: ''
  };
  filter: any = {
    from: 0,
    to: 0,
  };

  
  isUpdate = false;
  flagShowExpenseReport = true;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  async ngOnInit() {
    await this.populateFields();
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    )
      {

      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

    }
    this._dbService.getAllHolidayByPage(1).subscribe(holidays => {
      this.holidayArr = holidays["results"];
      this.holidayArrCount = holidays["count"];
    })
    this._dbService.getAllEmployeesbyPage(1).subscribe((x: any) => {
      this.employeeArray = x["results"];
      this.employeeArrCount = x["count"];
    })
    this._dbService.getLeaveByEmailID(this._dbService.getCurrentUserDetail().email).subscribe(leaves => {
      this.leaveArr = leaves["data"];
      this.leaveArrCount = leaves["data"].length;
    })
    this._dbService.getAllProject(1).subscribe(x => {
      this.projectArr = x["results"];
      this.projectArrCount = x["count"];
    })
    this._dbService.getAllTrainingByPage(1).subscribe(x => {
      this.trainingArr = x["results"];
      this.trainingArrCount = x["count"];
    })
    this._dbService.getAllNoticetab(1).subscribe(x => {
      this.noticeArr = x["results"];
      this.noticeArrCount = x["count"];
    })
    this._dbService.getAllCandidate(1).subscribe(x => {
      let tempArr= [];
      this.candidateArr = x["results"];
      this.candidateArrCount = x["count"];
      x['results'].map(x => {
        if(x.review_comments)
        tempArr.push(x);
      })
      this.interviewArr = tempArr;
      this.interviewArrCount =tempArr.length;
    })
    this._dbService.getAllExpenseList().subscribe(x => {
      this.expenseArr = x["data"];
      this.expenseArrCount = x["data"].length;
    })
    this._dbService.getAllPolicies().subscribe(x => {
      this.policyArr = x["data"];
      this.policyArrCount = x["data"].length;
    })
    


  }
  sortCustomers(data){}
  sort(data){}
  getEmployeeName = (data) => {
    if (data) {
      let returnArr = '[';
      if (data.length > 0) {
        data.map((item, index) => {
          returnArr += this.employeeArray.find(x => x.employee_id == item).first_name
          if (index < (data.length - 1)) returnArr += ",";
        })
      }
      return returnArr + "]";
    }
    else return;

  }
  filterData = async () => {
    this.filter = {
      from: new Date(this.model.fromDate).getTime(),
      to: new Date(this.model.toDate).getTime() + 86400000,
    };
    let page = 1;
    if (this.model.fromDate == '' || this.model.toDate == '') {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }
    if ((this.model.fromDate != '' && this.model.toDate != '') && (this.model.toDate) < (this.model.fromDate)) {
      this.toast.error('To Date must be greater than From Date.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }
    else {
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, page)
        .subscribe((response: any) => {

          if (response && response.data) {
            this.employeeArray = response.data.totalEmployees;
            this.employeeArrCount = response.data.totalEmployeesCount;
            this.holidayArr = response.data.totalHolidays;
            this.holidayArrCount = response.data.totalHolidaysCount;
            this.leaveArr = response["data"].totalLeaves.filter(x=>x.leave_mail == (this._dbService.getCurrentUserDetail().email));
            this.leaveArrCount = response["data"].totalLeaves.filter(x=>x.leave_mail == (this._dbService.getCurrentUserDetail().email)).length;
            this.trainingArr = response.data.totalTrainings;
            this.trainingArrCount = response.data.totalTrainingsCount;
            this.projectArr = response.data.totalProjects;
            this.projectArrCount = response.data.totalProjectsCount;
            this.noticeArr = response.data.totalNotices;
            this.noticeArrCount = response.data.totalNoticesCount;
            this.candidateArr =response.data.candidateArr;
            this.candidateArrCount = response.data.candidateArrCount;
            this.filterFlagEnabled = true;
          }
        });
    }
  }
  pageChanged(data, event) {

    if (data == "employee")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.employeeArray = res.data.totalEmployees;
      })
    else if (data == "holidays")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.holidayArr = res.data.totalHolidays;
      })
    else if (data == "leaves")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.leaveArr = res.data.totalLeaves;
      })
    else if (data == "training")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.trainingArr = res.data.totalTrainings;
      })
    else if (data == "project")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.projectArr = res.data.totalProjects;
      })
    else if (data == "notice")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.noticeArr = res.data.totalNotices;
      })
      else if (data == "candidate")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.candidateArr = res.data.candidateArr;
      })
      else if (data == "policy")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.noticeArr = res.data.totalNotices;
      })
      else if (data == "expense")
      this._dbService.getAllGlobalSearchHrmsByDate(this.filter.from, this.filter.to, event).subscribe((res: any) => {
        this.noticeArr = res.data.totalNotices;
      })

  }
  onClickEdit(data, obj) {

    if (data == "employee") {
      const dialogRef = this.dialog.open(EmployeesComponent);
      dialogRef.componentInstance.employee = obj.employee_id;
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.ngOnInit();
      });
    }
    else if (data == "holidays") {
      const dialogRef = this.dialog.open(HolidaysComponent);
      dialogRef.componentInstance.holiday_id = obj.holiday_id;
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.ngOnInit();
      });
    }
    else if (data == "leaves") {
      const dialogRef = this.dialog.open(LeavesComponent, { width: "400px" });
      dialogRef.componentInstance.leave_id = obj.leave_id;
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.ngOnInit();
      });
    }
    else if (data == "training") {
      const dialogRef = this.dialog.open(TrainingsComponent, { width: "400px" });
      dialogRef.componentInstance.training_id = obj.training_id;
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.ngOnInit();
      });
    }
    else if (data == "project") {
      const dialogRef = this.dialog.open(ProjectsComponent, { width: "400px" });
      dialogRef.componentInstance.project_id = obj.project_id;
      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.ngOnInit();
      });
    }
    else if (data == "notice") {
      this._router.navigate(['hrms/noticetab', obj.notice_tab_id]);
    }
    else if(data == "candidate")
    this._router.navigate(['hrms/settings/dynamicsettings/candidates', obj.candidate_id]);
    else if(data == 'policy')
    this._router.navigate(['hrms/settings/policy',obj.policy_id]);
    else if(data == 'expense')
    this._router.navigate(['/hrms/addexpense', obj.expense_id]);
  }
  async onClickDelete(data, obj) {

    if (data == "employee") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteEmployee(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "holidays") {
      if (confirm("Are you sure to delete " + obj.holiday_name)) {
        await this._dbService.deleteHoliday(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }

    else if (data == "leaves") {
      if (confirm("Are you sure to delete " + obj.leave_type)) {
        await this._dbService.deleteLeave(obj).toPromise();
        // console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "training") {
      if (confirm("Are you sure to delete " + obj.training_type)) {
        await this._dbService.deleteTraining(obj).toPromise();
        // console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "project") {
      if (confirm("Are you sure to delete " + obj.project_name)) {
        await this._dbService.deleteProject(obj).toPromise();
        // console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "notice") {
      if (confirm("Are you sure to delete " + obj.notice_type)) {
        await this._dbService.deleteNoticetab(obj).toPromise();
        // console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "candidate") {
      if (confirm("Are you sure to delete " + obj.candidate_name)) {
        await this._dbService.deleteCandidate(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "policy") {
      if(confirm("Are you sure to delete "+obj.currency_name)) {
        await this._dbService.deletePolicy(obj).toPromise();
       // console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
    else if (data == "expense") {
      if(confirm("Are you sure to delete "+obj.expense_item)) {
        await this._dbService.deleteExpense(obj).toPromise();
        //console.log("Implement delete functionality here");
        await this.filterData();
      }
    }
  }
}
