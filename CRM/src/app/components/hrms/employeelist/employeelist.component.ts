import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
import { EmployeesComponent } from '../employees/employees.component';
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
require('jspdf-autotable');
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent  extends DynamicComponent implements OnInit {
  editEmployeeFlag: boolean;
  employeeArray;
  selectedEmployee;
  first_name;
  ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   model: any = {
    fromDate: "",
    toDate: ""
  };
  date;
  filteredTableDataArr: any;
  
   constructor(private toast: ToastrService,private datepipe: DatePipe,injector: Injector,
    public _uiservice: UiService, public dialog: MatDialog, 
    ) { 
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEES,injector);
      
    }





  async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
   
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User||
   
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_User 
    ) {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    else if
    (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Admin ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager)
    {
    
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = false;
        this.ALL_DELETE_ALLOWED = false;
    
    
  }
  
      this.CAN_ADD = false;
    /*   let result = await this._dbService.getAllUsers().toPromise(); */
   
  }


 
  


  async ngOnInit() {
    await this.init();
    await this.populateFields();
    this._dbService.getAllEmployees().subscribe((x: any) => 
    {this.employeeArray = x.data;
    this.filteredTableDataArr= x.data;}
    )}
  
  
  getEmployeeByID(id){
    // console.log(id,this.employeeArray)
    if(id != 'self')
    return this.employeeArray.find(x => x.employee_id == id).first_name;
    else 
    return 'self';

  }

  openAddEmployees() {
    const dialogRef = this.dialog.open(EmployeesComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  myFunction(index) {
    document.getElementById("myDropdown" + index).classList.toggle("show");
  }
  deleteSeletedEmployee(item) {
    this._dbService.deleteEmployee(item).subscribe(x => {
      alert("Employee Deleted");
      this.ngOnInit();
    })
  }
  editSeletedEmployee(item, index) {
    document.getElementById("myDropdown" + index).classList.toggle("show");
    const dialogRef = this.dialog.open(EmployeesComponent);
    dialogRef.componentInstance.employee = item.employee_id;
    dialogRef.afterClosed().subscribe(result => {
      // if (result)
        this.ngOnInit();
    });
  }
  searchData(type) {
    if (type == 'clear' && !this.first_name) this.ngOnInit();

    else if (type == 'search')
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.first_name, 'employee').subscribe((x: any) => {
        this.employeeArray = x.data;
        this.filteredTableDataArr= x.data;

      }
      );
  }
  filterData() {
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
      this.filteredTableDataArr = [];
      let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
      
      for (let i = 0; i < this.employeeArray.length; i++) {
        var dt: any = this.datepipe.transform(this.employeeArray[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          this.filteredTableDataArr.push(this.employeeArray[i]);
        }

      }
    }
  }
  async downloadPdf() {
    let data = null;
    let result = await this._dbService.getAllEmployees().toPromise();
    this.employeeArray = result["data"];
    const doc = new jsPDF();
    let fileName = "EmployeeList.pdf";
    fileName = "EmployeeList.pdf";
    //data = document.getElementById('content2');
    const col = ["First Name", "Email ID", "Phone", "Join date", "Designation"];
    const rows = [];

    for (let k = 0; k < this.employeeArray.length; k++) {
      var temp = [this.employeeArray[k].first_name,
      this.employeeArray[k].email, this.employeeArray[k].phone,
      this.employeeArray[k].joining_date, this.employeeArray[k].designation

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
  async generateCsv() {
    let result = await this._dbService.getAllEmployees().toPromise();
    this.employeeArray = result["data"];
    this.downloadFile(this.employeeArray, 'EmployeeList');
  }
  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        if (!array[i][head]) {
          array[i][head] = '';
        }
        if(head == "assigned_to")
        array[i][head] = this.getEmployeeByID(array[i][head])
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
  downloadFile(data, filename = 'data') {
    let csvData = this.ConvertToCSV(data, [
      'first_name',
      'last_name',
      'phone',
      'email',
      'joining_date',
      'designation',
      'assigned_to',
      'leaves_available',
      'employee_status',]);
    // console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) { //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
}
