import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as path from 'path';
import { PolicyDetails } from 'src/app/models/PolicyDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
@Component({
  selector: 'app-policylist',
  templateUrl: './policylist.component.html',
  styleUrls: ['./policylist.component.css']
})
export class PolicylistComponent  extends DynamicComponent implements OnInit {

  

  constructor( private toast: ToastrService,private datepipe: DatePipe,private _router: Router, 
    private _activatedRoute: ActivatedRoute,injector: Injector,public _uiservice:UiService) {
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_POLICY_LIST,injector);
   }
   policy_name;
  isUpdate = false;
  policyDetail : PolicyDetails;
  filteredTableDataArr: any;
  policyDataArr = [];
  searchText;
  date;
  key: string = 'id'
  reverse:boolean = false;
  p:number = 1;
   filterQuery = ""
   rowsOnPage = 5;
   model: any = {
    fromDate: "",
    toDate: ""
  };
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  policyDetailsCount: number = 0;
  isValidFormSubmitted = false;
  invalid_file =true;
  file: any;
  path: any[];
  data:any[];
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
    let result = await this._dbService.getAllPolicy(1).toPromise();
   // console.log("result:", result);
    this.policyDataArr = result["results"];
    this.filteredTableDataArr = this.policyDataArr;
    this.policyDetailsCount =result["count"];
  
  }
 async ngOnInit() {
  await this.populateFields();
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['hrms/settings/policy',obj.policy_id]);
}

searchData(type){
 
  if(type == 'clear'&& !this.policy_name)this.ngOnInit();

  else if(type == 'search') 
   this._dbService.getAllGlobalSearchByKeywordAndSection(this.policy_name,'policy').subscribe((x: any)=>
   {
     this.filteredTableDataArr =x.data;
  });
  
 
  }

   
	   
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.currency_name)) {
      await this._dbService.deletePolicy(obj).toPromise();
     // console.log("Implement delete functionality here");
      await this.init();
    }
  }
  

   pageChanged(data,event){
    console.log(data,event);
    this._dbService.getAllPolicy(event).subscribe((res:any) => {
      console.log(res)

      this.policyDataArr=res.results
      
      this.filteredTableDataArr = this.policyDataArr;
    })

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
      
      for (let i = 0; i < this.policyDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.policyDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          this.filteredTableDataArr.push(this.policyDataArr[i]);
        }

      }
    }
  }
  sort(id){
    
  }
  async downloadPdf() {
    let data = null;
    let result = await this._dbService.getAllPolicies().toPromise();
    this.policyDataArr = result["data"];
    const doc = new jsPDF();
    let fileName = "PolicyList.pdf";
    fileName = "PolicyList.pdf";
    //data = document.getElementById('content2');
    const col = ["Policy Name", "files", "Description", ];
    const rows = [];

    for (let k = 0; k < this.policyDataArr.length; k++) {
      var temp = [this.policyDataArr[k].policy_name,
      this.policyDataArr[k].files, this.policyDataArr[k].description,

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
    let result = await this._dbService.getAllPolicies().toPromise();
    this.policyDataArr = result["data"];
    this.downloadFile(this.policyDataArr, 'PolicyList');
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
      'policy_name',
      'files',
      'description',
     ]);
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