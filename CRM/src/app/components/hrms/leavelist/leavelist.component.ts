import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { LeavesComponent } from '../leaves/leaves.component';
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.css']
})
export class LeavelistComponent extends DynamicComponent implements OnInit {
  leaveArr: any;
  SHOW_EDIT_DELETE = true;
  key: string = 'id'
  reverse: boolean = true;
  holiday_name;
  leaveCount: number = 1;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  leave_type;
  p:number =1;
  date;
  annualLeaveCount = 0;
  medicalLeaveCount = 0;
  otherLeaveCount = 0;
  remainingLeaveCount = 0;
  filteredTableDataArr: any;
  model: any = {
    fromDate: "",
    toDate: ""
  };
  constructor(private toast: ToastrService,private datepipe: DatePipe,public _uiservice: UiService, injector: Injector, public dialog: MatDialog,) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVES_LIST, injector);
  }

  
  async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
   
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_User ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
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
    await this.populateFields();
    this._dbService.getAllEmployees().subscribe(x=>{
      x["data"].map(y=>{
        if(y.email == this._dbService.getCurrentUserDetail().email){
          this.remainingLeaveCount = y.leaves_available;
        }
      })
    })
    
await this.init();
    this.medicalLeaveCount=0
    this.annualLeaveCount=0;
    this.otherLeaveCount=0;
    this._dbService.getLeaveByEmailID(this._dbService.getCurrentUserDetail().email).subscribe(leaves => {
      this.leaveArr = leaves["data"];
      this.filteredTableDataArr =  leaves["data"];
      this.findLeaveCategories(this.leaveArr )
    })

  }
  findLeaveCategories(data){
    data.map((leave) => {
      if(leave.leave_type == "medical leave")
      this.medicalLeaveCount+=1;
      if(leave.leave_type == "casual leave")
      this.annualLeaveCount+=1;
      if(leave.leave_type == "loss pay")
      this.otherLeaveCount+=1;
      
    })

  }
  openAddleave() {
    const dialogRef = this.dialog.open(LeavesComponent, { width: "500px" });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  pageChanged(event) {
    console.log(event);
    this._dbService.getAllLeaves().subscribe((res: any) => {
      this.leaveArr = res["data"];
    })
  }
  searchData(type) {
    console.log(this.leave_type);
    
    if (type == 'clear' && !this.leave_type) this.ngOnInit();
    else if (type == 'search')
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.leave_type, 'leaves').subscribe((x: any) => {
        console.log(x)
        this.leaveArr = x["data"].filter(x=>x.leave_mail == (this._dbService.getCurrentUserDetail().email));
        this.filteredTableDataArr= x["data"].filter(x=>x.leave_mail == (this._dbService.getCurrentUserDetail().email));      }
      );
  }
  async onClickDelete(obj, page) {
    if (confirm("Are you sure to delete " + obj.leave_type)) {
      await this._dbService.deleteLeave(obj).toPromise();
      this.ngOnInit();
    }
  }
  onClickEdit(item) {
    const dialogRef = this.dialog.open(LeavesComponent, { width: "500px" });
    dialogRef.componentInstance.leave_id = item.leave_id;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
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
      
      for (let i = 0; i < this.leaveArr.length; i++) {
        var dt: any = this.datepipe.transform(this.leaveArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          this.filteredTableDataArr.push(this.leaveArr[i]);
        }

      }
    }
  }
  async downloadPdf() {
    let data = null;
    this._dbService.getLeaveByEmailID(this._dbService.getCurrentUserDetail().email).subscribe(leaves => {
      this.leaveArr = leaves["data"];
      const doc = new jsPDF();
    let fileName = "leaveList.pdf";
    fileName = "leaveList.pdf";
    //data = document.getElementById('content2');
    const col = ["Leave Type", "Leave From", "Leave To",  "Leave Status", "Leave Days", "leave Reason"];
    const rows = [];

    for (let k = 0; k < this.leaveArr.length; k++) {
      var temp = [this.leaveArr[k].leave_type,
      this.leaveArr[k].leave_from, this.leaveArr[k].leave_to,
      this.leaveArr[k].leave_status, this.leaveArr[k].leave_days,this.leaveArr[k].leave_reason


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
    })
  
    

  }
  sort(data){}
  async generateCsv() {
    this._dbService.getLeaveByEmailID(this._dbService.getCurrentUserDetail().email).subscribe(leaves => {
      this.leaveArr = leaves["data"];
      this.downloadFile(this.leaveArr, 'leaveList');
    })
   
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
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
  downloadFile(data, filename = 'data') {
    let csvData = this.ConvertToCSV(data, [
      'leave_type',
      'leave_from',
      'leave_to',
      'leave_status',
      'leave_days',
      'leave_reason',]);
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
