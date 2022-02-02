import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationDetail } from 'src/app/models/DesignationDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { UiService } from 'src/app/services/ui.service';
const jsPDF = require('jspdf');
@Component({
  selector: 'app-leaveapprovelist',
  templateUrl: './leaveapprovelist.component.html',
  styleUrls: ['./leaveapprovelist.component.css']
})
export class LeaveapprovelistComponent  extends DynamicComponent implements OnInit {
  employeeArray = [];
  leave_type: any;
  leaveApprovedArr= [];
  leavePendingArr = [];
  leaveRejectedArr= [];
  date;

  constructor(private toast: ToastrService, private datepipe: DatePipe,private _router: Router,
     private _activatedRoute: ActivatedRoute, injector: Injector,
     public _uiservice: UiService) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVE_APPROVE,injector);
  }
  isUpdate = false;
  designationDetail: DesignationDetail;
  filteredTableDataArr: any;
  leaveArr = [];
  searchText;
  designation_name: any;

  p: number = 1;
  filterQuery = ""
  rowsOnPage = 5;

  fromDate;
  toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  leaveDetailsCount: number = 0;
  employee_name;
  model: any = {
    fromDate: "",
    toDate: ""
  };
  async init() {

    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_User ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Manager||
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


    this.CAN_ADD = false;

    this._dbService.getAllLeave(1).subscribe(x=>{
      this.leaveArr = x["results"];
      this.filteredTableDataArr = this.leaveArr;
      this.leaveDetailsCount = x["count"];
      this.leaveArr.map(x=>{
        if(x.leave_status == "approved")
        this.leaveApprovedArr.push(x);
        if(x.leave_status == "pending")
        this.leavePendingArr.push(x);
        if(x.leave_status == "rejected")
        this.leaveRejectedArr.push(x);
      })
    })
    



  }
  async ngOnInit() {

    await this.init();
    await this.populateFields();
  }



  onClickEdit(obj) {
    this._router.navigate(['hrms/settings/leaveapproves', obj.leave_id]);
  }






  async onClickDelete(obj) {
    if (confirm("Are you sure to delete " + obj.leave_mail)) {
      await this._dbService.deleteLeave(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }

  getEmployeeName = (id) => {
    console.log("I am id", id);

    for (let k = 0; k < this.employeeArray.length; k++) {
      console.log(this.employeeArray[k].employee_id, id);

      if (this.employeeArray[k].employee_id == id)
        return this.employeeArray[k].first_name;

    }

  }





  searchData(type) {
    console.log(this.leave_type);

    if (type == 'clear' && !this.leave_type) this.ngOnInit();
    else if (type == 'search')
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.leave_type, 'leaves').subscribe((x: any) => {
        this.leaveArr = x.data;
        this.filteredTableDataArr = x.data;
      }
      );
  }
  pageChanged(data, event) {
    console.log(data, event);
    this._dbService.getAllTravel(event).subscribe((res: any) => {
      console.log(res)

      this.leaveArr = res.results

      this.filteredTableDataArr = this.leaveArr;
    })

  }
  key: string = 'id'
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
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
    let result = await this._dbService.getAllEmployees().toPromise();
    this.employeeArray = result["data"];
    const doc = new jsPDF();
    let fileName = "LeaveApproveList.pdf";
    fileName = "LeaveApproveList.pdf";
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

  }
  async generateCsv() {
    let result = await this._dbService.getAllLeaves().toPromise();
    this.employeeArray = result["data"];
    this.downloadFile(this.employeeArray, 'LeaveApproveList');
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
