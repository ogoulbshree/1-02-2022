import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceDetail } from 'src/app/models/AttendanceDetails.model';
import { DepartmentDetail } from 'src/app/models/DepartmentDetail.model';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-paysliplist',
  templateUrl: './paysliplist.component.html',
  styleUrls: ['./paysliplist.component.css']
})
export class PaysliplistComponent  extends DynamicComponent implements OnInit {
  employeeArray :EmployeeDetail[]=[];
  monthsArray = [{ "name": 'January', value: 1 }, { "name": 'February', value: 2 }, { "name": 'March', value: 3 }, { "name": 'April', value: 4 },
  { "name": 'May', value: 5 }, { "name": 'June', value: 6 }, { "name": 'july', value: 7 }, { "name": 'August', value: 8 }, { "name": 'September', value: 9 },
  { "name": 'October', value: 10 }, { "name": 'November', value: 11 }, { "name": 'December', value: 12 }];

  keyword = 'first_name';
  dateErrorFlag: Boolean = false;
  attendanceDetail: AttendanceDetail;
  showLeaveFlag: boolean = false;
  insufficientFlag: boolean = false;
  employeeDetail= new EmployeeDetail();
  form: FormGroup;
  yearSelected: any;
  monthSelected: any;
  constructor(private formBuilder: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute, 
    injector: Injector,public _uiservice:UiService,) {

      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYSLIP,injector);
  }
  isUpdate = false;
  first_name:string;
  filteredTableDataArr: any;
  travelDataArr = [];
  selectedEmployee= new EmployeeDetail();


  async htmlInit() {
    // this.employeeDetail = new EmployeeDetail();
    this._dbService.getAllEmployees().subscribe(x => {
      this.employeeArray = x["data"]
    })

  }

  async ngOnInit() {

    await this.htmlInit();
    await this.populateFields();
    this.form = this.formBuilder.group({
      monthSelected: [''],
      yearSelected: [''],
      employeeName:['']

    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });



  }

  selectedDate(type, event) {
    // console.log("employee", type, event);
    if (type == 'year')
      this.yearSelected = event.target.value;
    else
      this.monthSelected = event.target.value;

  }
  selectEvent(employee) {
    // console.log("employee", employee);

    this.selectedEmployee = employee;
    // console.log(this.selectedEmployee);

  }
  generatePDF() {

    this._router.navigate(['/hrms/settings/payslips'], {
      state: {
        monthSelected: this.monthSelected,
        yearSelected: this.yearSelected,
        employee: JSON.stringify(this.selectedEmployee)
      }
    });
  }

}