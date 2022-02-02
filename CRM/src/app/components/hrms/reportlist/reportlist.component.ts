import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { Chart } from "node_modules/chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesComponent } from '../employees/employees.component';
import { HolidaysComponent } from '../holidays/holidays.component';
import { LeavesComponent } from '../leaves/leaves.component';
import { TrainingsComponent } from '../trainings/trainings.component';
import { ProjectsComponent } from '../projects/projects.component';
import { Router } from '@angular/router';
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.css']
})
export class ReportlistComponent extends DynamicComponent implements OnInit {
  form: FormGroup;
  sectionArr = [{ "name": "Employees table" }, { "name": "Holidays Table" }, { "name": "Leaves Table" }, { "name": "Notice Table" }
    , { "name": "Training Table" },{ "name": "Project Table" }, { "name": "Expense Table" }, { "name": "Travel Table" },
  { "name": "Attendance Table" }, { "name": "Policy Table" }, { "name": "Payroll Table" }, { "name": "Task Management Table" }
  ]
  monthsArray = [{ "name": 'January', value: 1 }, { "name": 'February', value: 2 }, { "name": 'March', value: 3 }, { "name": 'April', value: 4 },
  { "name": 'May', value: 5 }, { "name": 'June', value: 6 }, { "name": 'july', value: 7 }, { "name": 'August', value: 8 }, { "name": 'September', value: 9 },
  { "name": 'October', value: 10 }, { "name": 'November', value: 11 }, { "name": 'December', value: 12 }];
  globalDataArray = []
  chartSearchCompleted: boolean;
  showTableFlag: boolean = false;
  selectedArr = [];
  employeeArr = [];
  leaveArr = [];
  employeeCount: number = 0;
  attendancePage: number = 1;
  employeeArray: any;
  reverse: boolean = true;
  key: string = 'id';
  policyCount:number=0;
  employeePagination
  holidaysPagination
  holidayCount: number = 0;
  leaveCount: number = 0;
  trainingCount: number = 0;
  projectCount: number = 0;
  noticeCount: number = 0;
  payrollCount: number = 0;
  travelCount: number = 0;
  leavesPagination: number = 1;
  trainingPagination: number = 1;
  projectPagination: number = 1;
  noticePagination: number = 1;
  travelPagination: number = 1;
  policyPagination: number = 1;
  payrollPagination: number = 1;
  tasksPagination: number = 1;
  p: number = 1;
  SHOW_EDIT_DELETE = true;
  tasksCount: number = 0;
  expensesDetailsCount:number = 0
  constructor(private _router: Router, public dialog: MatDialog, public _uiservice: UiService, injector: Injector, private formBuilder: FormBuilder,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_REPORTS, injector);
  }
  async ngOnInit() {
    await this.populateFields();
    this._dbService.getAllEmployees().subscribe(employee => {
      this.employeeArr = employee["data"];
      this.employeeCount =  employee["data"].length;
    });

    
    this.formConfig();
  }
  formConfig() {
    this.form = this.formBuilder.group({
      chartType: ['', Validators.required],
      viewType: ['', Validators.required],
      sectionType: ['', Validators.required],
      monthSelected: [''],
      yearSelected: ['', Validators.required],

    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }
   daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}
async downloadPdf(leaveArr) {
  let data = null;
  
  const doc = new jsPDF();
  let fileName = "Attendance.pdf";
  fileName = "Attendance.pdf";
  //data = document.getElementById('content2');
  const col = ["Employee Name", "Present Days", "Leave Days",];
  const rows = [];

  for (let k = 0; k < leaveArr.length; k++) {
    var temp = [leaveArr[k].name,
    leaveArr[k].attended_days, leaveArr[k].leave_days,

    ];
    rows.push(temp);
  }
  const header = function (data) {
    doc.setFontSize(18);
    doc.setTextColor(30);
    doc.getFontList('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    doc.text("Report for Customer List", data.settings.margin.left, 50);
  }; doc.autoTable(col, rows, {
    theme: 'grid',
    /*  theme: 'striped' */
    styles: {
      halign: 'right',
    },
    headerStyles: {
      fillColor: [0, 65, 69], halign: 'center'
    },
    margin: { top: 60 }, beforePageContent: header,

    columnStyles: {
      0: { halign: 'left' }
    },


  });

  doc.save(fileName);

}

  getDaysFromMonth(month, year) {
    let daysArray = [];
    let days = new Date(year, month, 0).getDate();
    if (days)
      for (let k = 1; k <= days; k++)
        daysArray.push(k)
    // console.log(daysArray);

    return daysArray;

  }
  getIndex = (id) => {
    // console.log(id, this.globalDataArray);
    let index = this.globalDataArray.findIndex(x => x === id);

    if (index >= 0)
      return this.monthsArray.find(x => x.value == index + 1).name

  }
  async pageChanged(data, event) {
    // console.log(data, event);
    this._dbService.getAllEmployeesbyPage(event).subscribe((res: any) => {
      // console.log(res)

      // this.employeeCount = res.count;
      this.employeeArr = res.results;
      this.leaveArr=[];
      this._dbService.getAllLeaves().subscribe(leaves => {
        this.employeeArr.map((data) => {
          let leave = leaves["data"].find(x => x.leave_mail == data.email && this.form.value.monthSelected == new Date(x.leave_to).getMonth()+1);
          if (leave) {
            let obj = {
              name: data.first_name,
              attended_days: this.daysInMonth(this.form.value.monthSelected,this.form.value.yearSelected) - leave.leave_days,
              leave_days:leave.leave_days
            }
            this.leaveArr.push(obj)
            // console.log(this.leaveArr);
  
          }
          else {
            let obj = {
              name: data.first_name,
              attended_days: this.daysInMonth(this.form.value.monthSelected,this.form.value.yearSelected),
              leave_days:0
            }
            this.leaveArr.push(obj)
          }
        })
      })
      
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
    else if (data == "expense") {
      this._router.navigate(['/hrms/addexpense', obj.expense_id]);
    }
    else if (data == "travel")
      this._router.navigate(['hrms/settings/dynamicsettings/travels', obj.travel_id]);
    else if (data == "attendance")
      this._router.navigate(['/hrms/settings/attendances', obj.attendance_id]);
    else if (data == "policy")
      this._router.navigate(['hrms/settings/policy', obj.policy_id]);
    else if (data == "payroll")
      this._router.navigate(['/hrms/settings/payrolls', obj.payroll_id]);
    else
      this._router.navigate(['/hrms/settings/tasks', obj.task_id]);
  }
  retrieveName(id) {
    return this.employeeArr.find(x => x.employee_id == id).first_name
  }

  async onClickDelete(data, obj) {

    if (data == "employee") {
      if (confirm("Are you sure to delete " + obj.first_name)) {
        await this._dbService.deleteEmployee(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "holidays") {
      if (confirm("Are you sure to delete " + obj.holiday_name)) {
        await this._dbService.deleteHoliday(obj).toPromise();
        this.getChart();
      }
    }

    else if (data == "leaves") {
      if (confirm("Are you sure to delete " + obj.leave_type)) {
        await this._dbService.deleteLeave(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "training") {
      if (confirm("Are you sure to delete " + obj.training_type)) {
        await this._dbService.deleteTraining(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "project") {
      if (confirm("Are you sure to delete " + obj.project_name)) {
        await this._dbService.deleteProject(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "notice") {
      if (confirm("Are you sure to delete " + obj.notice_type)) {
        await this._dbService.deleteNoticetab(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "expense") {
      if (confirm("Are you sure to delete " + obj.expense_item)) {
        await this._dbService.deleteExpense(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "travel") {
      if (confirm("Are you sure to delete " + obj.employee_name)) {
        await this._dbService.deleteTravel(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "attendance") {
      if (confirm("Are you sure to delete " + obj.leave_type)) {
        await this._dbService.deleteAttendace(obj).toPromise();
        this.getChart();
      }
    }
    else if (data == "policy") {
      if (confirm("Are you sure to delete " + obj.leave_type)) {
        await this._dbService.deleteAttendace(obj).toPromise();
        //console.log("Implement delete functionality here");
        this.getChart();
      }
    }
    else if (data == "payroll") {
      if (confirm("Are you sure to delete " + obj.currency_name)) {
        await this._dbService.deletePolicy(obj).toPromise();
        // console.log("Implement delete functionality here");
        this.getChart();
      }
    }
    else if (data == "tasks") {
      if (confirm("Are you sure to delete " + obj.task_name)) {
        await this._dbService.deleteTask(obj).toPromise();
        //console.log("Implement delete functionality here");
        this.getChart();
      }
    }
  }
  getIndexMonthly = (id) => {

    if (id) {
      let index = this.globalDataArray.findIndex(x => x == id)
      return index + 1;
    }


  }
  getPercentage = (value, globalDataArray) => {
    if (value) {
      let sum = 0;

      this.globalDataArray.map((data) => {
        sum += data;
      });
      return (value * 100 / sum).toFixed(2) + "%";
    }


  }

  getEmployeeName = (data) => {
    if (data) {
      let returnArr = '[';
      if (data.length > 0) {
        data.map((item, index) => {
          returnArr += this.employeeArr.find(x => x.employee_id == item).first_name
          if (index < (data.length - 1)) returnArr += ",";
        })
      }
      return returnArr + "]";
    }
    else return;

  }

  displayName(id) {
    if (id)
      return this.employeeArr.find(x => x.employee_id === id).first_name

  }
  onChange(event) {
    this.form.get('viewType').setValue("");
    this.form.get('yearSelected').setValue("");
    this.form.get('chartType').setValue("");
    this.chartSearchCompleted = false;
    this.showTableFlag = false;
  }
  sortCustomers(data){}
  sort(data){}
  async getChart() {

    let myChart, selectedArr, dataArray = [];
    this.globalDataArray = [];
    this.selectedArr = []
    if (this.form.value.sectionType == "Employees table")
      selectedArr = await this._dbService.getAllEmployees().toPromise();
    else if (this.form.value.sectionType == "Holidays Table")
      selectedArr = await this._dbService.getAllHolidays().toPromise();
    else if (this.form.value.sectionType == "Leaves Table")
      selectedArr = await this._dbService.getAllLeaves().toPromise();
    else if (this.form.value.sectionType == "Notice Table")
      selectedArr = await this._dbService.getAllNoticetabs().toPromise();
    else if (this.form.value.sectionType == "Training Table")
      selectedArr = await this._dbService.getAllTrainings().toPromise();
    else if (this.form.value.sectionType == "InterView Table")
      selectedArr = await this._dbService.getAllCandidates().toPromise();
    else if (this.form.value.sectionType == "Expense Table")
      selectedArr = await this._dbService.getAllExpenseList().toPromise();
    else if (this.form.value.sectionType == "Travel Table")
      selectedArr = await this._dbService.getAllTravels().toPromise();
    else if (this.form.value.sectionType == "Attendance Table") {
      this.leaveArr=[];
      selectedArr = await this._dbService.getAllAttendacesList().toPromise();
      this._dbService.getAllLeaves().subscribe(leaves => {
        this.employeeArr.map((data) => {
          let leave = leaves["data"].find(x => x.leave_mail == data.email && this.form.value.monthSelected == new Date(x.leave_to).getMonth()+1);
          if (leave) {
            let obj = {
              name: data.first_name,
              attended_days: this.daysInMonth(this.form.value.monthSelected,this.form.value.yearSelected) - leave.leave_days,
              leave_days:leave.leave_days
            }
            this.leaveArr.push(obj)
            // console.log(this.leaveArr);
  
          }
          else {
            let obj = {
              name: data.first_name,
              attended_days: this.daysInMonth(this.form.value.monthSelected,this.form.value.yearSelected),
              leave_days:0
            }
            this.leaveArr.push(obj)
          }
        })
      })

    }

    else if (this.form.value.sectionType == "Policy Table")
      selectedArr = await this._dbService.getAllPolicies().toPromise();
    else if (this.form.value.sectionType == "Payroll Table")
      selectedArr = await this._dbService.getAllPayrolls().toPromise();
    else if (this.form.value.sectionType == "Task Management Table")
      selectedArr = await this._dbService.getAllTasks().toPromise();
    else if (this.form.value.sectionType == "Project Table")
      selectedArr = await this._dbService.getAllProjects().toPromise();
    if (this.form.value.chartType == "table") {
      this.showTableFlag = true;
      if (this.form.value.viewType == "Yearly") {
        selectedArr.data.map((x) => {
          let date = new Date(x.created_time);
          if (this.form.value.yearSelected == date.getFullYear())
            this.selectedArr.push(x)
        })
      }
      else if (this.form.value.viewType == "Monthly") {
        selectedArr.data.map((x, index) => {
          let date = new Date(x.created_time);
          if (this.form.value.monthSelected == date.getMonth() + 1 && this.form.value.yearSelected == date.getFullYear())
            this.selectedArr.push(x)
        })
      }


    }
    else {
      this.showTableFlag = false;
      this.chartSearchCompleted = true;
      if (this.form.value.viewType == "Yearly") {

        selectedArr.data.map((x) => {
          let date = new Date(x.created_time);
          // console.log("I am date: ", date, this.globalDataArray[date.getMonth()]);

          if (this.form.value.yearSelected == date.getFullYear()) {
            if (dataArray[date.getMonth()] && this.globalDataArray[date.getMonth()]) {
              dataArray[date.getMonth()] = dataArray[date.getMonth()] + 1;
              this.globalDataArray[date.getMonth()] = this.globalDataArray[date.getMonth()] + 1;
            }
            else {
              dataArray[date.getMonth()] = 1;
              this.globalDataArray[date.getMonth()] = 1;
            }
          }
        })
      }
      else if (this.form.value.viewType == "Monthly") {
        selectedArr.data.map((x, index) => {

          let date = new Date(x.created_time);
          // console.log("I am date", date);
          if (this.form.value.monthSelected == date.getMonth() + 1 && this.form.value.yearSelected == date.getFullYear()) {
            if (dataArray[date.getDate() - 1]) {
              dataArray[date.getDate() - 1] = dataArray[date.getDate() - 1] + 1;
              this.globalDataArray[date.getDate() - 1] = this.globalDataArray[date.getDate() - 1] + 1;
            }
            else {
              dataArray[date.getDate() - 1] = 1;
              this.globalDataArray[date.getDate() - 1] = 1
            }
          }

        })

      }
      document.getElementById("divChart").innerHTML = '&nbsp;';
      document.getElementById("divChart").innerHTML = '<canvas id="myChart" width="400" height="400" ></canvas>';

      myChart = new Chart('myChart', {
        type: this.form.value.chartType,
        data: {
          labels: this.form.value.viewType == "Yearly" ? this.monthsArray.map(x => { return x.name }) : this.getDaysFromMonth(this.form.value.monthSelected, this.form.value.yearSelected),
          datasets: [{
            label: this.form.value.sectionType + " count",
            data: dataArray,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: this.form.value.chartType == "bar" ? {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          } : {},
          plugins: {
            responsive: true,
            plugins: {
            },
            datalabels: {
              formatter: (value, ctx) => {

                let dataArr = ctx.chart.data.datasets[0].data;

                if (value) {
                  let sum = 0;

                  dataArr.map((data) => {
                    sum += data;
                  });
                  return (value * 100 / sum).toFixed(2) + "%";
                }

              },
            },
          }
        },
        plugins: [ChartDataLabels],
      })
    }

  }
}

