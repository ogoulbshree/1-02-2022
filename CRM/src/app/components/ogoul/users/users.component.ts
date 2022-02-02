import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from 'src/app/services/dbservice.service';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 
  userDataArr = [];
  filteredTableDataArr: any;
  flagShowUserReport = true;
  searchText;
  
   filterQuery = ""
   rowsOnPage = 5;
   

   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;

  constructor(private _dbService: DBService, private _router: Router) { }



    async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Ogoul_User ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Admin ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Manager ) 
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    

    this.CAN_ADD = true;
     
    let result = await this._dbService.getAllUsersForAdmin(GlobalConstants.CURRENT_MODULE).toPromise();
    console.log("result:", result);
    this.userDataArr = result["data"];
    this.filteredTableDataArr = this.userDataArr;
  }

  async ngOnInit() {
  await this.init();
  }

  onClickEdit(obj) {
    this._router.navigate(['/ogoul/adduserpage', obj.user_id]);
  }

  async onClickDelete(obj) {
    console.log("will delete user:::", obj);
    await this._dbService.deleteUser(obj).toPromise();
    await this.init();
  }



  //////csv
  
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, ['marketing_username', 'first_name','email']);
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
    this.downloadFile(this.userDataArr, 'userlist');
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
        pdf.save('Marketinguserlist.pdf'); // Generated PDF   
      });
    } 



    downloadPdf() {
      let data = null;
      const doc = new jsPDF( {orientation: 'landscape'});
      let fileName = "userlist.pdf";
      if (this.flagShowUserReport) {
        fileName = "userlist.pdf";
     
        const col = ["username", "First Name","Email"];
        const rows = [];
  
        for (let k = 0; k < this.userDataArr.length; k++) {
          var temp = [this.userDataArr[k].marketing_username,
          this.userDataArr[k].first_name,this.userDataArr[k].email
  
          ];
          rows.push(temp);
        }
        let pageCount = "{total_pages_count_string}";
        let today = formatDate(new Date(), 'MM/dd/yyyy', 'en-US');
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.getFontList('normal');
       
          doc.text("Report for Marketing user List", data.settings.margin.left, 50);
        };  doc.autoTable(col, rows, {
          theme: 'grid',
          /*  theme: 'striped' */
          
          styles: {
            halign: 'right',
            cellWidth: 'wrap',
            rowPageBreak: 'avoid',
            overflow: 'linebreak'
          },
          
          headerStyles: {
            fillColor: [0, 65, 69], halign: 'center'
          },
          margin: { top: 60 }, beforePageContent: header,
  
          columnStyles: {
            description: { cellWidth: 'auto' },
            comments: { cellWidth: 'auto' },
            remarks: { cellWidth: 'auto' }
          },
          didDrawPage: function (data) {
            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            let pageSize = doc.internal.pageSize;
            let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            // Header
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');            
            doc.text('MarketingUserlist', pageWidth / 2, 10, 'center');
  
            // Footer
            let page = "Page " + doc.internal.getNumberOfPages()
            // Total page number plugin only available in jspdf v1.0+
            // if (typeof doc.putTotalPages === 'function') {
            //     page = page + " of " + pageCount;
            // }
            doc.setFontSize(10);
            doc.text(today, data.settings.margin.left, pageHeight - 5);
            doc.text( pageWidth / 2, pageHeight - 5, 'center');
            doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
        },
  
        });
  
        doc.save(fileName);
  
      }
  
    }

  }

   
