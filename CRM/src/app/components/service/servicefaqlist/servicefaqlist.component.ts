import { Component, Injector, OnInit ,ViewChild} from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { Router } from '@angular/router';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { FaqDetail } from 'src/app/models/FaqDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-servicefaqlist',
  templateUrl: './servicefaqlist.component.html',
  styleUrls: ['./servicefaqlist.component.css']
})
export class ServicefaqlistComponent extends DynamicComponent implements OnInit {

  
  faqDataArr: FaqDetail[] = [];
  filteredTableDataArr: any;
  flagShowUserReport = true;
  searchText;
  fromDate;
    toDate;
   filterQuery = ""
   rowsOnPage = 5;
   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   
   first_name;
   @ViewChild('csv', {static: false}) modal; 
   invalid_file: boolean = true;
   file_obj: any[];
   file: HTMLInputElement;
     
   questions :any;
   
   p:number =1;
	 
   model: any = {
    fromDate: "",
    toDate:""
   };
   date = new Date;
   faqDetailsCount: number = 0;
   
  constructor( private _router: Router,injector: Injector,public _uiservice: UiService,private datepipe: DatePipe,
    private toast: ToastrService) {
    super(GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_FAQ,injector);
  }
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
    ) {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    
  }
  this.CAN_ADD = false;
  let result = await this._dbService.getAllFaqs(1).toPromise();
  //console.log("result:", result);
  this.faqDataArr = result["results"];
  this.filteredTableDataArr = this.faqDataArr;
  this.faqDetailsCount = result["count"];
}
  
  async ngOnInit() {
  await this.init();
  await this.populateFields();
  }

  onClickEdit(obj) {
    this._router.navigate(['/service/servicefaq', obj.faq_id]);
  }



  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.questions)) {
      await this._dbService.deleteFaqs(obj).toPromise();
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
    for (let i = 0; i < this.faqDataArr.length; i++) {
      var dt: any = this.datepipe.transform(this.faqDataArr[i].created_time, 'yyyy-MM-dd');
      if (dt >= from && dt <= to) {
        
       /*  this.toast.error('From Date must be <= To Date.', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
        }); */
        this.filteredTableDataArr.push(this.faqDataArr[i]);
      }
     
    }
  }
}

  //////csv
  
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, ['questions', 'answers','status']);
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
    let result = await this._dbService.getAllFaq().toPromise();
    this.faqDataArr = result["data"];
    this.downloadFile(this.faqDataArr, 'faqlist');
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
        pdf.save('faqlist.pdf'); // Generated PDF   
      });
    } 



    async downloadPdf() {
      let result = await this._dbService.getAllFaq().toPromise();
      this.faqDataArr = result["data"];
      let data = null;
      const doc = new jsPDF();
      let fileName = "faqlist.pdf";
      if (this.flagShowUserReport) {
        fileName = "faqlist.pdf";
        //data = document.getElementById('content2');
        const col = ["Questions", "Answers", "Status"];
        const rows = [];
  
        for (let k = 0; k < this.faqDataArr.length; k++) {
          var temp = [ this.faqDataArr[k].questions,
          this.faqDataArr[k].answers,this.faqDataArr[k].status
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.getFontList('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for Faq List", data.settings.margin.left, 50);
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
                  questions:values[0],
                 answers:values[1],
                 status:values[2],
                  faq_id: Date.now() + i - 1,
                  created_time: Date.now(),
                  modified_time: Date.now(),
                  created_by: this._dbService.getCurrentUserDetail().email,
                  updated_by:this._dbService.getCurrentUserDetail().email
                } as FaqDetail;
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
    this._dbService.addMultipleFaq(this.file_obj).subscribe((val) => {

      for(let i = 0; i < this.file_obj.length; i++){
        this.file_obj[i]._id = val.data[i];
      }
      //reset indicators
      this.file.value = '';
      this.invalid_file = true;
    });
    
  }

  searchData(type){
    if(type == 'clear'&& !this.questions)this.ngOnInit();
    
    else if(type == 'search') 
     this._dbService.getAllGlobalSearchByKeywordAndSection(this.questions,'faq').subscribe((x: any)=>{
        this.filteredTableDataArr =x.data;
        this.faqDetailsCount =  x.data.length;
       
     }
     );
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllFaqs(event).subscribe((res:any) => {
        // console.log(res)
  
        this.faqDataArr=res.results
        
        this.filteredTableDataArr = this.faqDataArr;
      })
  
    }
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
}