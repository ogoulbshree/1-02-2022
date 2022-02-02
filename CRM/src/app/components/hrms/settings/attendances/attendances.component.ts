import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceDetail } from 'src/app/models/AttendanceDetails.model';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { formatDate } from "@angular/common";
import { of } from "rxjs";
@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent extends DynamicComponent implements OnInit {
  employeeArray = [];
  keyword = 'first_name';
  currentDate = new Date();
  dateFormat = "dd MMM yyyy";
  currentDate$ = of(formatDate(this.currentDate, this.dateFormat, this.locale));
 
  dateErrorFlag: Boolean = false;
  attendanceDetail= new AttendanceDetail();
  showLeaveFlag: boolean = false;
  insufficientFlag: boolean = false;
  constructor( @Inject(LOCALE_ID) public locale: string,private _router: Router, private _activatedRoute: ActivatedRoute, public _uiservice: UiService, injector: Injector) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ATTENDENCES, injector);
  }
  isUpdate = false;
  first_name;
  filteredTableDataArr: any;
  travelDataArr = [];
  selectedEmployee: EmployeeDetail;


  async htmlInit() {

    this._dbService.getAllEmployees().subscribe(x => {
      this.employeeArray = x["data"]
    })

  }

  async ngOnInit() {

    await this.htmlInit();
    await this.populateFields();
    // this.attendanceDetail = new AttendanceDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        // console.log("params:", params);
        let attendance_id = params["id"];
        if (attendance_id) {
          let result = await this._dbService.getAttendace(attendance_id).toPromise();
          //console.log(result);
          this.attendanceDetail = result["data"];
          this._dbService.getEmployeeByID(this.attendanceDetail.employee_id).subscribe(x => {
            this.selectedEmployee = x["data"]
          })
          this.isUpdate = true;
        }

      }
    );


  }

  dateSelected() {
    if (this.attendanceDetail.leave_from && this.attendanceDetail.leave_to &&
      new Date(this.attendanceDetail.leave_from) > new Date(this.attendanceDetail.leave_to)) {
      this.dateErrorFlag = true;
      
    }
    else if (new Date(this.attendanceDetail.leave_from) <= new Date(this.attendanceDetail.leave_to)) {
      this.dateErrorFlag = false;
      var date1 = new Date(this.attendanceDetail.leave_from);
      var date2 = new Date(this.attendanceDetail.leave_to);
      var Time = date2.getTime() - date1.getTime();
      let days = (Time / (1000 * 3600 * 24)+1);
      // console.log(days, this.selectedEmployee);
      if (this.selectedEmployee.leaves_available < days) {
        this.insufficientFlag = true;
      }
      else
        this.insufficientFlag = false;
    }

  }
  showError = "";
  async onSubmit() {
    let days;
    //CustomLogger.logStringWithObject("Will save product...", this.productDetail);
    if (this.attendanceDetail.leave_from && this.attendanceDetail.leave_to) {
      var date1 = new Date(this.attendanceDetail.leave_from);
      var date2 = new Date(this.attendanceDetail.leave_to);
      var Time = date2.getTime() - date1.getTime();
      days = Time / (1000 * 3600 * 24)+1;
    }
    this.attendanceDetail.updated_by = this._dbService.getCurrentUserDetail().email;
    this.attendanceDetail.employee_id = this.selectedEmployee.employee_id.toString()
    /* 
     this.productDetail.modified_by_user = this._dbService.getCurrentUserDetail().user_id; */
    this.attendanceDetail.modified_time = Date.now();
    try {
      let result = null;
      //CustomLogger.logStringWithObject("FILES:", this.file);


      if (this.isUpdate) {
        // result = await this._dbService.updateAttendace(this.attendanceDetail).toPromise();
       
        this._dbService.updateAttendace(this.attendanceDetail).subscribe(attendance => {
         
            this._dbService.getEmployeeByID(this.attendanceDetail.employee_id).subscribe(x => {
              let employee = x["data"];
              
                employee.leaves_available = employee.leaves_available + this.attendanceDetail.leave_days;
                employee.leaves_available = employee.leaves_available - days;
                this._dbService.updateEmployee(employee).subscribe(x => {})
             
              
            })

        })
      }
      else {
        this.attendanceDetail.created_by = this._dbService.getCurrentUserDetail().email;
        /*  this.productDetail.created_by_user = this._dbService.getCurrentUserDetail().user_id; */
        this.attendanceDetail.created_time = Date.now();
        this.attendanceDetail.leave_days = days;
        // result = await this._dbService.addAttendace(this.attendanceDetail).toPromise();
        this._dbService.addAttendace(this.attendanceDetail).subscribe(attendance => {
          if (attendance["data"]) {
            this._dbService.getEmployeeByID(this.attendanceDetail.employee_id).subscribe(x => {
              let employee = x["data"];
              employee.leaves_available = employee.leaves_available - days;
              this._dbService.updateEmployee(employee).subscribe(x => {})
            })
          }

        })
      }
      // CustomLogger.logStringWithObject("addProduct:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("Attendace Added Successfully");
      else
        CustomMisc.showAlert("Attendace Updated Successfully");
      this._router.navigate(["hrms/settings/attendancelist"]);
      this.showError = "";

    }
    catch (error) {
      //CustomLogger.logError(error);
      CustomMisc.showAlert("Product already exist: please check and update the Unique product Name");

      this.showError = error.error.message;
    }
    /* catch (error) { 
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Product: " + error.message, true);
    }  */

  }


  onClickForm() {
    // this.attendanceDetail.designation_name = "";
  }
  selectEvent(employee) {
    // console.log("employee", employee);;

    this.selectedEmployee = employee;
    // console.log(this.selectedEmployee);

  }

}