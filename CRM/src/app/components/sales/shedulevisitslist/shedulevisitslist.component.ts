import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from '../../../services/ui.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { MapsAPILoader } from '@agm/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { ToastrService } from 'ngx-toastr';

declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { ShedulevisitsDetail } from 'src/app/models/ShedulevisitsDetail.model';
@Component({
  selector: 'app-shedulevisitslist',
  templateUrl: './shedulevisitslist.component.html',
  styleUrls: ['./shedulevisitslist.component.css']
})
export class ShedulevisitslistComponent extends DynamicComponent implements OnInit {

  username;
  fromDate;
  toDate;
  first_name :any;
   
    p:number =1;
  filterQuery = ""
  rowsOnPage = 5; 
  usertype;
  scheduleVisitLists:any = [];
  _scheduleVisitLists : ShedulevisitsDetail[] = [];;
  isUpdate:boolean = false;

  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  flagShowUserReport
  
   model: any = {
    fromDate: "",
    toDate:""
   };
   date = new Date;
 
   scheduledVisitCount: number=0;
  email: any;
   
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private toastyService: ToastyService,
    private _activatedRoute: ActivatedRoute,public _uiservice: UiService,private _router: Router,
    injector: Injector, private toast: ToastrService,private datepipe: DatePipe) {

      super(GlobalConstants.SALES_COMPONENT_NAME.SALES_SHEDULE_VISITS,injector);
     }
  async init() {
     
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager 

    ) 
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
      this.CAN_ADD = false;
    let result = await this._dbService.getAllScheduleVisits(1).toPromise();
    //console.log("result:", result);
    this.scheduleVisitLists = result["results"];
    this.scheduledVisitCount =result["count"];
   
  }
 
  
  async ngOnInit() {
    await this.populateFields();
    await this.init();
    this._uiservice.userValue.subscribe(data =>{
      this.username = data['username'];
      this.usertype = data['usertype'];
    })
    let assignedVisits = [];
    this._dbService.getAllScheduleVisits(1).subscribe(res => {
      if (res) {
        if(this.usertype == 'Super Admin' || this.usertype == 'Super Manager'){
          this._scheduleVisitLists = res.results;

          this.scheduleVisitLists = res.results;
         
          this.isUpdate = true;
        }else{
          res.results.forEach(scheduleVisit => {
            if(scheduleVisit.sales_username == this.username){
              assignedVisits.push(scheduleVisit);
            }
          });
          this._scheduleVisitLists = assignedVisits;
          this.scheduleVisitLists = assignedVisits;
        }
      }
    });
  }
  onClickEdit(obj){
    this._router.navigate(['/sales/shedulevisits', obj.schedule_visit_id]);
  }
  //delete the visit
  onClickDelete(obj){
    if(confirm("Are you sure to delete this visit")) {
      this._dbService.deleteScheduleVisit({schedule_visit_id: obj.schedule_visit_id}).subscribe(res =>{
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
      });


      let assignedVisits = [];
      //after delete update the table, getAllVisit and update 
      this._dbService.getAllScheduleVisits(1).subscribe(res => {
        if (this.isUpdate) {
          //show all scheduled visits to admin and manager
          if(this.usertype == 'Super Admin' || this.usertype== ' Super Manager'){
            this._scheduleVisitLists = res.results;
            this.scheduleVisitLists = this._scheduleVisitLists;
          }else{
             //show all scheduled visits of a logged in user, if user is not manager or Admin
            res.results.forEach(scheduleVisit => {
              if(scheduleVisit.sales_username == this.username){
                assignedVisits.push(scheduleVisit);
              }
            });
            this._scheduleVisitLists = assignedVisits;
            this.scheduleVisitLists = assignedVisits;
          }
        }
      });
    }
  }
 /*  filterVisits(){
    let filteredVisits = [];
    let filter = {
      from: new Date(this.model.fromDate).getTime() -1,
      to: new Date(this.model.toDate).getTime() + 1,  
    };
    if(this.model.fromDate && this.model.toDate)
    {
      for(let i = 0; i< this._scheduleVisitLists.length; i++)
      {
        let savedDate = (new Date(this._scheduleVisitLists[i].date)).getTime();
        if(savedDate > filter.from && savedDate < filter.to )
        {
          filteredVisits.push(this._scheduleVisitLists[i]);
        }
      }
    }
    else{
      filteredVisits = this._scheduleVisitLists;
    }
    this.scheduleVisitLists = filteredVisits;
  } */


  searchVisits(type) {
    if(type == 'clear' && !this.email)this.ngOnInit();
    else if(type == 'search')
    {
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.email,'ScheduleVisits').subscribe((x: any)=> {
        this.scheduleVisitLists  =x.data;
       });
    }
  }


  filterVisits() {
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
      this.scheduleVisitLists = [];
      let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');
      for (let i = 0; i < this._scheduleVisitLists.length; i++) {
        var dt: any = this.datepipe.transform(this._scheduleVisitLists[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.scheduleVisitLists.push(this._scheduleVisitLists[i]);
        }
       
      }
    }
  }
  //naveen - to show alerts at completion or failure of actions
  showAlert(msg, type) {
    var toastOptions: ToastOptions = {
      title: type,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
       // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        //console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    if (type == "success") {
      this.toastyService.success(toastOptions);
    } else if (type == "failed") {
      this.toastyService.error(toastOptions);
    } else {
      this.toastyService.warning(toastOptions);
    }
  }


  
downloadFile(data, filename = 'data') {
  if (this.flagShowUserReport) {
    let csvData = this.ConvertToCSV(data, ['created_by','first_name','last_name','email','phone']);
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
  this.downloadFile(this.scheduleVisitLists,'Schedule Visit');
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
      pdf.save('Addvistlist.pdf'); // Generated PDF   
    });
  } 



  downloadPdf() {
    let data = null;
    const doc = new jsPDF();
    let fileName = "Schedule Visit.pdf";
    if (this.flagShowUserReport) {
      fileName = "Addvisitlist.pdf";
      //data = document.getElementById('content2');
      const col = [ "User Email", "First Name","Last Name","Email","Phone"];
      const rows = [];

      for (let k = 0; k < this.scheduleVisitLists.length; k++) {
        var temp = [ this.scheduleVisitLists[k].created_by,
        this.scheduleVisitLists[k].first_name,this.scheduleVisitLists[k].last_name,
        this.scheduleVisitLists[k].email,this.scheduleVisitLists[k].phone

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.getFontList('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Add Schedule Visit", data.settings.margin.left, 50);
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
  
 
 /*  searchData(type){
 
    if(type == 'clear' && !this.first_name)this.ngOnInit();
    else if(type == 'search')
    {
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.first_name,'customers').subscribe((x: any)=> {this.scheduleVisitLists  =x.data;
      this.scheduledVisitCount = x.data.length});
    }
    } */

    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllScheduleVisits(event).subscribe((res:any) => {
        // console.log(res)
  
        this.scheduleVisitLists=res.results
        
      
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
   
  
}

