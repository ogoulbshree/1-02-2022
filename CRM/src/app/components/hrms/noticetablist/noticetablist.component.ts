import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoticetabDetail } from 'src/app/models/NoticeTabDetails.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';

require('jspdf-autotable');
import html2canvas from 'html2canvas';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
@Component({
  selector: 'app-noticetablist',
  templateUrl: './noticetablist.component.html',
  styleUrls: ['./noticetablist.component.css']
})
export class NoticetablistComponent extends DynamicComponent implements OnInit {

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, 
    public _uiservice: UiService,  injector: Injector,
    private datepipe: DatePipe,
    private toast: ToastrService) { 
       
      super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_NOTICE,injector);

   
  }




  noticeDataArr :NoticetabDetail[] = [];
  filteredTableDataArr: any;
  flagShowProductReport = true;
  @ViewChild('csv', {static: false}) modal; 
  invalid_file: boolean = true;
  file_obj: any[];
  file: HTMLInputElement;
  searchText;
  filterQuery = ""
  rowsOnPage = 5;
  fromDate;
    toDate;
  categoryDetail = [];
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

 
  model: any = {
    fromDate: "",
    toDate:""
   };
   
   notice_type:any;
    p:number =1;
 
    date = new Date;
    noticeDetailsCount:number=0;
  
  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||

    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager||
   
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Hr_User 
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
    let result = await this._dbService.getAllNoticetab(1).toPromise();
   // console.log("result:", result);
    this.noticeDataArr = result["results"];
    this.filteredTableDataArr = this.noticeDataArr;
    this.noticeDetailsCount = result["count"];

  }
  /*  async htmlInit() {
     let result = await this._dbService.getAllCategory().toPromise();
     console.log("result:", result);
     this.categoryDetail = result["data"];
     this.filteredTableDataArr = this.categoryDetail;
   
   } */



  async ngOnInit() {
    await this.init();
    await this.populateFields();
    /*   await this.htmlInit(); */

  }

  onClickEdit(obj) {
    this._router.navigate(['hrms/noticetab', obj.notice_tab_id]);
  }

 

  
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.notice_type)) {
      await this._dbService.deleteNoticetab(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }

  search(term: string) {
    let fieldName = "notice_type";
    this.filteredTableDataArr = this.noticeDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }
  save(){}
	
	



  async downloadPdf() {
    let result = await this._dbService.getAllNoticetabs().toPromise();
     this.noticeDataArr = result["data"];
    let data = null;
    const doc = new jsPDF();
    let fileName = "Noticetab.pdf";
    if (this.flagShowProductReport) {
      fileName = "Noticetab.pdf";
      //data = document.getElementById('content2');
      const col = [ "Notice Type", "Notice Date", "Notice by"];
      const rows = [];

      for (let k = 0; k < this.noticeDataArr.length; k++) {
        var temp = [ this.noticeDataArr[k].notice_type,
        this.noticeDataArr[k].notice_date, this.noticeDataArr[k].notice_by

        ];
        rows.push(temp);
      }

      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Noticetab List", data.settings.margin.left, 50);
      };

      doc.autoTable(col, rows, {
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
  downloadFile(data, filename = 'data') {
    if (this.flagShowProductReport) {
      let csvData = this.ConvertToCSV(data, ['notice_type','notice_date', 'notice_by']);
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
    let result = await this._dbService.getAllNoticetabs().toPromise();
    this.noticeDataArr = result["data"];
    this.downloadFile(this.noticeDataArr, 'Noticetablist');
    }
  

  exportToPrint()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0; 
     
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Productlist.pdf'); // Generated PDF   
    });  
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
                notice_type:values[0],
                  description:values[1],
                  notice_date:values[2],
                  attatchment:values[3],
                  notice_by: values[4],
               notice_tab_id: Date.now() + i - 1,
               created_time: Date.now(),
               modified_time: Date.now(),
               created_by: this._dbService.getCurrentUserDetail().email,
               updated_by:this._dbService.getCurrentUserDetail().email
              } as NoticetabDetail;
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

/* save(){

  this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
 
 

  this._dbService.addMultipleProduct(this.file_obj).subscribe((val) => {

    for(let i = 0; i < this.file_obj.length; i++){
      this.file_obj[i]._id = val.data[i];
    }
  
    this.file.value = '';
    this.invalid_file = true;
  });
  
} */


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
    for (let i = 0; i < this.noticeDataArr.length; i++) {
      var dt: any = this.datepipe.transform(this.noticeDataArr[i].created_time, 'yyyy-MM-dd');
      if (dt >= from && dt <= to) {
        
       /*  this.toast.error('From Date must be <= To Date.', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
        }); */
        this.filteredTableDataArr.push(this.noticeDataArr[i]);
      }
     
    }
  }
}


searchData(type){
 console.log(this.notice_type)
  if(type == 'clear' && !this.notice_type)this.ngOnInit();
  else if(type == 'search')
  this._dbService.getAllGlobalSearchByKeywordAndSection(this.notice_type,'notice').subscribe((x: any)=>{this.filteredTableDataArr =x.data;
    this.noticeDetailsCount = x.data.length});


  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names +=  productArr[k].product_name;
      if(k<(productArr.length - 1)) names += ",";
    }
    return names + "]";
  }
  pageChanged(data,event){
    console.log(data,event);
    this._dbService.getAllNoticetab(event).subscribe((res:any) => {
      console.log(res)

      this.noticeDataArr=res.results
      
      this.filteredTableDataArr = this.noticeDataArr;
    })

  }
  }
  

