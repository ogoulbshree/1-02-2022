import { Component, Injector, OnInit ,ViewChild} from '@angular/core';

import { DBService } from 'src/app/services/dbservice.service';
import { Router } from '@angular/router';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { CustomerDetail } from 'src/app/models/CustomerDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { DatePipe, formatDate } from '@angular/common';
import { UiService } from 'src/app/services/ui.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent extends DynamicComponent implements OnInit {

   
  customerDataArr: ObjectDetail[] = [];
  filteredTableDataArr: any;
  flagShowUserReport = true;
  searchText;
  
   filterQuery = ""
   rowsOnPage = 5;

   fromDate;
   toDate;
 

   
   model: any = {
    fromDate: "",
    toDate:""
   };
   
   first_name :any;
   
   p:number =1;
	 
   date = new Date;
   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   closeResult: string;

   @ViewChild('csv', {static: false}) modal; 
   invalid_file: boolean = true;
   file_obj: any[];
   file: HTMLInputElement;
   customerDetailsCount: number = 0;
  constructor( private _router: Router,private modalService: NgbModal,injector: Injector,
    public _uiservice: UiService,private toast: ToastrService,private datepipe: DatePipe) 
  { 
   /*  this.IMAGEBASE_URL = GlobalConstants.BACKEND_SERVER_URL; */
   
    super(GlobalConstants.COMPONENT_NAME.MARKETING_CUSTOMER,injector);
    
  }

  /* async init() {
    let result = await this._dbService.getAllCustomer().toPromise();
    console.log("result:", result);
    this.customerDataArr = result["data"];
    this.filteredTableDataArr = this.customerDataArr;
  }
    */


    
 
   async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Service_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager 
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Inventory_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Inventory_Manager 
    )
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
      this.CAN_ADD = false;
      let result = await this._dbService.objgetAllCustomer(1).toPromise();
     // console.log("result:", result);
      this.customerDataArr = result["results"];
      this.filteredTableDataArr = this.customerDataArr;
      this.customerDetailsCount = result["count"];
  }
  async ngOnInit() {
  await this.init();
  await this.populateFields();
  }

  onClickEdit(obj) {
    this._router.navigate(['/marketing/addcustomer', obj.object_id]);
  }

 
	
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.first_name)) {
      await this._dbService.deleteCustomer(obj).toPromise();
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
      for (let i = 0; i < this.customerDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.customerDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.filteredTableDataArr.push(this.customerDataArr[i]);
        }
       
      }
    }
  }



  //////csv
  
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, [ 
        'salutation',
        'first_name',
        'last_name',
        'email',
        'phone',
        'home_phone',
        'company_name',
        'account_name',
        'title',
        'department',
        'fax',
        'dob',
        'source',
        'opportunity_percentage',
        'linked_in_url',
        'mailing_address',
        'other_address',
        'mailing_city',
        'mailing_state',
        'mailing_Postal_code',
        'mailing_country',
        'description']);
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
    let result = await this._dbService.getAllCustomers().toPromise();
    this.customerDataArr = result["data"];
    this.downloadFile(this.customerDataArr, 'customerlist');
    }

    exportToPrint() 
    {
      let data = null;
      const doc = new jsPDF( {orientation: 'landscape'});
     
      let fileName = "Customerlist.pdf";
      if (this.flagShowUserReport) {
        fileName = "Customerlist.pdf";
        //data = document.getElementById('content2');
        const col = [ "First Name", "Last Name","Phone","Email"];
        const rows = [];
  
        for (let k = 0; k < this.customerDataArr.length; k++) {
          var temp = [ this.customerDataArr[k].first_name,
          this.customerDataArr[k].last_name, this.customerDataArr[k].phone,this.customerDataArr[k].email
  
          ];
          rows.push(temp);
        }
        let pageCount = "{total_pages_count_string}";
        let today = formatDate(new Date(), 'MM/dd/yyyy', 'en-US');
       /*  const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.setFont('normal');
        
          doc.text("Report for contact List", data.settings.margin.left, 50);
        };   */
        
        doc.autoTable(col, rows, {
          theme: 'grid',
          /*  theme: 'striped' */
          styles: {
            halign: 'right',
            cellWidth: 'wrap',
            rowPageBreak: 'avoid',
            overflow: 'linebreak'
          },

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
            doc.text('Customers', pageWidth / 2, 10, 'center');
  
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
        margin: { top: 15, bottom: 15 }
  
        });

        this.setiFrameForPrint(doc);
  
        doc.save(fileName);
  
      }
     
  
}
setiFrameForPrint(doc) {
  const iframe = document.createElement('iframe');
  iframe.id = "iprint";
  iframe.name = "iprint";
  iframe.src = doc.output('bloburl');
  iframe.setAttribute('style', 'display: none;');
  document.body.appendChild(iframe);
  iframe.contentWindow.print();
}




    async downloadPdf() {
      let result = await this._dbService.getAllCustomers().toPromise();
      this.customerDataArr = result["data"];
      let data = null;
      const doc = new jsPDF();
      let fileName = "customerlist.pdf";
      if (this.flagShowUserReport) {
        fileName = "customerlist.pdf";
        //data = document.getElementById('content2');
        const col = [ "First Name", "Last Name","Phone","Email"];
        const rows = [];
  
        for (let k = 0; k < this.customerDataArr.length; k++) {
          var temp = [ this.customerDataArr[k].first_name,
          this.customerDataArr[k].last_name, this.customerDataArr[k].phone,this.customerDataArr[k].email
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.getFontList('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for customer List", data.settings.margin.left, 50);
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
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }


      
    upload(event: Event){
      //get the file target
      this.file = event.target as HTMLInputElement
      //get file variable
      let fileToUpload = this.file.files.item(0);
      
      //check if file is csv
      if(fileToUpload.name.includes('.csv')){
        
        this.invalid_file = false;
        let fr = new FileReader();
        //read file callbacak
        fr.onload =  (e) => {
          //results
          let res = fr.result as string;
          //split on new line
          let lines = res.split('\n');
          this.file_obj = [];
  
            for(let i = 1; i < lines.length; i++){
              //split on comma
              let values = lines[i].split(',');
              if(values && lines[i]){
                //create obj based on csv values
                let obj = {
                  salutation:values[0],
                  first_name:values[1],
                  last_name:values[2],
                  email:values[3],
                  phone:values[4],
                  home_phone:values[5],
                  company_name:values[6],
                  account_name:values[7],
                  title:values[8],
                  department:values[9],
                  fax:values[10],
                  dob:values[11],
                  source:values[12],
                
                  opportunity_percentage:values[13],
                  linked_in_url:values[14],
                  mailing_address:values[15],
                  other_address:values[16],
                  mailing_city:values[17],
                  mailing_state:values[18],
                  mailing_Postal_code:values[19],
                  mailing_country:values[20],
                  description:values[21],
                  
                 /*  first_name: values[0],
                  last_name: values[1],
                  email: values[2].replace('\r', "").toLowerCase(),
                  phone: values[3], */
                  object_type:3,
                  object_id: Date.now() + i-1,
                  created_time: Date.now(),
                  modified_time: Date.now(),
                  created_by: this._dbService.getCurrentUserDetail().email,
                  updated_by:this._dbService.getCurrentUserDetail().email
                 
                }  as ObjectDetail;
                //push to array
                this.file_obj.push(obj);
              }
            }
          }
  
          //read file
          fr.readAsText(fileToUpload);
      }else{
        this.invalid_file = true;
      }
    }
  
  save(){
    //add new data to array
    this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
    //calculate occurence
   

    //add deals to db
    this._dbService.addMultipleCustomer(this.file_obj).subscribe((val) => {

      for(let i = 0; i < this.file_obj.length; i++){
        this.file_obj[i]._id = val.data[i];
      }
      //reset indicators
      this.file.value = '';
      this.invalid_file = true;
    });
    
 
  }
  searchData(type){
    if(type == 'clear'&& !this.first_name)this.ngOnInit();
    
    else if(type == 'search') 
     this._dbService.getAllGlobalSearchByKeywordAndSection(this.first_name,'customers').subscribe((x: any)=>{
        this.filteredTableDataArr =x.data;
        this.customerDetailsCount =  x.data.length;
       
     }
     );
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.objgetAllCustomer(event).subscribe((res:any) => {
        // console.log(res)
  
        this.customerDataArr=res.results
        
        this.filteredTableDataArr = this.customerDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
}