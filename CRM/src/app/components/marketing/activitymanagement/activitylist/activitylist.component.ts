import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { ActivityDetail } from 'src/app/models/ActivityDetail.model';
import { DBService } from 'src/app/services/dbservice.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-activitylist',
  templateUrl: './activitylist.component.html',
  styleUrls: ['./activitylist.component.css']
})
export class ActivitylistComponent extends DynamicComponent  implements OnInit {
  filteredTableDataArr: any;
  flagShowUserReport = true;
  searchText;
 
  isUpdate = false;

  activityDetail: ActivityDetail
  
  activityDataArr = [];
  
  fromDate;
    toDate;
   filterQuery = ""
   rowsOnPage = 5;
   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   
    
   model: any = {
    fromDate: "",
    toDate:""
   };

   record_type :any;
   
   p:number =1;
 
    date = new Date;
    activityDetailcount: number=0;
  
   constructor( private _router: Router,injector: Injector,
    public  _uiservice: UiService,private toast: ToastrService,private datepipe: DatePipe) {
   
    super(GlobalConstants.COMPONENT_NAME.MARKETING_ACTIVITIES,injector);


}

   
   
  /*  async init() {
    let result = await this._dbService.getAllActivity().toPromise();
    
    console.log("result:", result);
    this.activityDataArr = result["data"];
    this.filteredTableDataArr = this.activityDataArr;

  } */

 
  async init() {
  
    if (
     this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Super_Manager 
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Super_Sales 
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager 
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    )
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }

  this.CAN_ADD = false;
  let result = await this._dbService.getAllActivity(1).toPromise();
    
    //console.log("result:", result);
    this.activityDataArr = result["results"];
    this.filteredTableDataArr = this.activityDataArr;
    this.activityDetailcount = result["count"];

  }

  async ngOnInit() {
  await this.init();
  await this.populateFields();
  }

  onClickEdit(obj) {
    this._router.navigate(['/marketing/activitymanagement/addactivity', obj.activity_id]);
  }

  
	
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.record_type)) {
      await this._dbService.deleteActivity(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }
	
	
  filterData() {
    if (this.model.fromDate == '' || this.model.toDate == '') 
    {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    } 
  
    if((this.model.fromDate != '' && this.model.toDate !='') && (this.model.toDate) < (this.model.fromDate)){
      this.toast.error('To Date must be greater than From Date.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }
  
    else {
      this.filteredTableDataArr = [];
      let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
      for (let i = 0; i < this.activityDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.activityDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.filteredTableDataArr.push(this.activityDataArr[i]);
        }
       
      }
    }
  }




  //////csv
  
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, [ 'record_type', 'subject','due_date']);
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

  async generateCsv(){
    let result = await this._dbService.getAllActivityList().toPromise();
    this.activityDataArr = result["data"];
    this.downloadFile(this.activityDataArr, 'Activity list');
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
        pdf.save('Activity list.pdf'); // Generated PDF   
      });
    } 

    
    async downloadPdf() {
      let result = await this._dbService.getAllActivityList().toPromise();
      this.activityDataArr = result["data"];
      let data = null;
      const doc = new jsPDF();
      let fileName = "Activity list.pdf";
      if (this.flagShowUserReport) {
        fileName = "Activity list.pdf";
        //data = document.getElementById('content2');
        const col = ["record_type", "subject", "due_date"];
        const rows = [];
  
        for (let k = 0; k < this.activityDataArr.length; k++) {
          var temp = [this.activityDataArr[k].record_type, this.activityDataArr[k].subject,
          this.activityDataArr[k].due_date,
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.setFont('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for Campiagn List", data.settings.margin.left, 50);
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


    searchData(type){
      if(type == 'clear'&& !this.record_type)this.ngOnInit();
      
      else if(type == 'search') 
       this._dbService.getAllGlobalSearchByKeywordAndSection(this.record_type,'activity').subscribe((x: any)=>{
          this.filteredTableDataArr =x.data;
          this.activityDetailcount =  x.data.length;
         
       }
       );
      }
   
      pageChanged(data,event){
        // console.log(data,event);
        this._dbService.getAllActivity(event).subscribe((res:any) => {
          // console.log(res)
    
          this.activityDataArr=res.results
          
          this.filteredTableDataArr = this.activityDataArr;
        })
    
      }
      key: string = 'id'
      reverse :boolean =false;
      sort(key){
        this.key = key;
        this.reverse = !this.reverse;
      }

}
