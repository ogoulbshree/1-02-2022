import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';

import { DBService } from 'src/app/services/dbservice.service';
import { Router } from '@angular/router';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { CaseDetail } from 'src/app/models/CaseDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-caselist',
  templateUrl: './caselist.component.html',
  styleUrls: ['./caselist.component.css']
})
export class CaselistComponent  implements OnInit {


 
  caseDataArr: CaseDetail[] = [];
  filteredTableDataArr: any;
  flagShowUserReport = true;
  searchText;
  fromDate;
    toDate;
   filterQuery = ""
   rowsOnPage = 5;
  p:number=1;

   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   constructor( private _dbService :DBService, private _router: Router,injector: Injector,public _uiservice:UiService) {
    
  }
   async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager 
    ) {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    
  }
  this.CAN_ADD = false;
  let result = await this._dbService.getAllCases().toPromise();
 // console.log("result:", result);
  this.caseDataArr = result["data"];
  this.filteredTableDataArr = this.caseDataArr;
}
  
  async ngOnInit() {
  await this.init();
 
  }

  onClickEdit(obj) {
    this._router.navigate(['/service/cases', obj.case_id]);
  }

 

    
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.case_name)) {
      await this._dbService.deleteCases(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }


  filterData(){
    let caseDataArr = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  
    };
    /* console.log("this.fromDate::::", this.fromDate);
    console.log("this.toDate::::", this.toDate);
    console.log("filter.from::::", filter.from);
    console.log("filter.to::::", filter.to); */
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this.caseDataArr.length; i++){
        //console.log("this.caseDataArr[i].created_time::::", this.caseDataArr[i].created_time);
        if(this.caseDataArr[i].created_time > filter.from && this.caseDataArr[i].created_time < filter.to ){
          caseDataArr.push(this.caseDataArr[i]);
        }
      }
    }else{
      caseDataArr = this.filteredTableDataArr;
    }
    this.filteredTableDataArr = caseDataArr;
  }





  //////csv
  
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, ['case_id', 'case_name','prioriry']);
      //console.log(csvData)
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

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  generateCsv(){
    this.downloadFile(this.caseDataArr, 'caselist');
    }

    exportToPrint() {
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
       
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf ('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;
  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('leadlist.pdf'); // Generated PDF   
      });
    } 



    downloadPdf() {
      let data = null;
      const doc = new jsPDF();
      let fileName = "caselist.pdf";
      if (this.flagShowUserReport) {
        fileName = "caselist.pdf";
        //data = document.getElementById('content2');
        const col = ["case_id", "Case Name", "Priority"];
        const rows = [];
  
        for (let k = 0; k < this.caseDataArr.length; k++) {
          var temp = [this.caseDataArr[k].case_id, this.caseDataArr[k].case_name,
          this.caseDataArr[k].priority
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.getFontList('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for Lead List", data.settings.margin.left, 50);
        };  doc.autoTable(col, rows, {
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
  
    }
}