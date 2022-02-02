import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serviceticketing } from 'src/app/models/Serviceticketing.model';
import { TicketDetail } from 'src/app/models/Ticketing.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent  extends DynamicComponent implements OnInit {

  

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,injector: Injector, 
    public _uiservice: UiService, private datepipe: DatePipe,
    private toast: ToastrService) 
  {
    super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_TICKETING,injector);
  }
  model: any = {
    fromDate: "",
    toDate:""
   };
  
   date = new Date;
  isUpdate = false;
  ticketDetail : Serviceticketing;
  filteredTableDataArr: any;
  ticketDataArr = [];
  searchText;
  assigned_users :any;
   
  p:number =1;
   filterQuery = ""
   rowsOnPage = 5;
   flagShowUserReport
   fromDate;
   toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  in_progress: number = 0;
  created: number = 0;
  on_hold: number = 0;
  closed:number =0;
  ticketingDetailsCount: number = 0;
  async init() {
   
   
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Ogoul_User ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Sales ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Ogoul_Service ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Inventory_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Inventory_Manager 

     ) 
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    
this.CAN_ADD = true;
    let result = await this._dbService.getAllserviceTicketing(1).toPromise();
   // console.log("result:", result);
    this.ticketDataArr = result["results"];
    this.filteredTableDataArr = this.ticketDataArr;
    this.ticketingDetailsCount = result["count"];
    this.calculate_occurence();
  }
 async ngOnInit() {
  await this.init();
  await this.populateFields();
  this.calculate_occurence();}

  
  
onClickEdit(obj) {
  this._router.navigate(['/service/ticketingpage',obj.ticket_id]);
}





   
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.assigned_users)) {
      await this._dbService.deleteserviceTicketing(obj).toPromise();
     // console.log("Implement delete functionality here");
      await this.init();
    }
  }

  search(term: string) {
    let fieldName = "name";
    this.filteredTableDataArr = this.ticketDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
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
      for (let i = 0; i < this.ticketDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.ticketDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.filteredTableDataArr.push(this.ticketDataArr[i]);
        }
       
      }
    }
  }
   
  
    
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, ['email','assigned_users','status','name','subject']);
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
        if(!array[i][head]) {
          array[i][head] = '';
        }
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  async generateCsv(){
    let result = await this._dbService.getAllTicketing().toPromise();
    this.ticketDataArr = result["data"];
    this.downloadFile(this.ticketDataArr, 'Ticketlist');
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
        pdf.save('Ticketlist.pdf'); // Generated PDF   
      });
    } 



    async downloadPdf() {
      let result = await this._dbService.getAllTicketing().toPromise();
      this.ticketDataArr = result["data"];
      let data = null;
      const doc = new jsPDF();
      let fileName = "Ticketing.pdf";
      if (this.flagShowUserReport) {
        fileName = "Ticketing.pdf";
        //data = document.getElementById('content2');
        const col = [ "Email", "Assigned Users","Name","Phone"];
        const rows = [];
  
        for (let k = 0; k < this.ticketDataArr.length; k++) {
          var temp = [ this.ticketDataArr[k].email,
          this.ticketDataArr[k].assigned_users, this.ticketDataArr[k].name,this.ticketDataArr[k].phone
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.getFontList('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for Ticketing List", data.settings.margin.left, 50);
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



    
calculate_occurence(){
  this.created = 0;
  this.in_progress = 0;
  this.on_hold = 0;
  this.closed = 0;
  for (let i = 0; i < this.filteredTableDataArr.length; i ++){
    if(this.filteredTableDataArr[i].status){
      let status = this.filteredTableDataArr[i].status.toLowerCase();
      if(status.includes("on hold")){
        this.on_hold++;
      }else if(status.includes("created")){
        this.created++;
      }else if(status.includes('in progress')){
        this.in_progress++;
      }
      else if(status.includes('closed')){
        this.closed++;
      }
    }
  }
}
searchData(type){
  if(type == 'clear'&& !this.assigned_users)this.ngOnInit();
  
  else if(type == 'search') 
   this._dbService.getAllGlobalSearchByKeywordAndSection(this.assigned_users,'ticket').subscribe((x: any)=>{
      this.filteredTableDataArr =x.data;
      this.ticketingDetailsCount =  x.data.length;
     
   }
   );
  }


  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllserviceTicketing(event).subscribe((res:any) => {
      // console.log(res)

      this.ticketDataArr=res.results
      
      this.filteredTableDataArr = this.ticketDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  }