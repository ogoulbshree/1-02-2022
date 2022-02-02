import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from 'src/app/services/dbservice.service';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { UiService } from 'src/app/services/ui.service';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent extends DynamicComponent implements OnInit{

  
  userDataArr = [];
  filteredTableDataArr: any;
  flagShowUserReport = true;
  searchText;
  usertype :any;
  key: string = 'id'
  reverse :boolean =false;
  p:number = 1;
   filterQuery = ""
   rowsOnPage = 5;
   fromDate;
   toDate;
   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   
   invalid_file: boolean = true;
   file_obj: any[];
   file: HTMLInputElement;

  
   model: any = {
    fromDate: "",
    toDate:""
   };
 
    date = new Date;
    userDetailsCount: number = 0;
  constructor(private _router: Router,injector: Injector,
    public _uiservice: UiService,private toast: ToastrService,private datepipe: DatePipe) 
  {
      super (GlobalConstants.COMPONENT_NAME.CRUD_USER,injector);
  }
 
/*  async init() {
    let result = await this._dbService.getAllMaketingusers().toPromise();
    console.log("result:", result);
    this.marketinguserDataArr = result["data"];
    this.filteredTableDataArr = this.marketinguserDataArr;
  }
    */


   async init() {
  
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Manager || 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Super_Sales ||
    
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_User
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager|| 
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    ) 
    
    {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Admin
      this.CAN_ADD = true;
   /*    let result = await this._dbService.getAllUsers().toPromise(); */
   let result = await this._dbService.getAllUsersForAdmin(GlobalConstants.CURRENT_MODULE).toPromise();
    //console.log("result:", result);
    this.userDataArr = result["data"];
    this.filteredTableDataArr = this.userDataArr;
    this.userDetailsCount =result["count"];
  }

  async ngOnInit() {
  await this.init();
  await this.populateFields();
  }

  onClickEdit(obj) {
    this._router.navigate(['/marketing/settings/adduser', obj.user_id]);
  }

 

  
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.usertype)) {
      await this._dbService.deleteUser(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  } 
	


   //////csv
  
  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, [ 'usertype','email','first_name','last_name','phone','dob']);
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
    this.downloadFile(this.userDataArr, 'Marketing userlist');
    }

    

    downloadPdf() {
      let data = null;
      const doc = new jsPDF();
      let fileName = "Marketing Userlist.pdf";
      if (this.flagShowUserReport) {
        fileName = "Marketing Userlist.pdf";
        //data = document.getElementById('content2');
        const col = ["Usertype","First Name", "Last Name","Email","Phone","Date Of Birth"
      ];
        const rows = [];
        for (let k = 0; k < this.userDataArr.length; k++) {
          var temp = [ this.userDataArr[k].usertype,
          this.userDataArr[k].first_name,this.userDataArr[k].last_name ,this.userDataArr[k].email ,this.userDataArr[k].phone,
          this.userDataArr[k].dob,
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.getFontList('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for Marketing User List", data.settings.margin.left, 50);
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
              
                usertype: values[0],
                email:values[1],
                password: values[2],
                first_name:values[3],
                last_name: values[4],
                phone: values[5],
                dob: values[6],
                user_id: Date.now() + i-1,
                created_time: Date.now(),
                modified_time: Date.now(),
                created_by: this._dbService.getCurrentUserDetail().email,
                updated_by:this._dbService.getCurrentUserDetail().email
               
              } as UserDetail;
             // console.log("OBJ::::", obj);
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
  this._dbService.addMultipleUser(this.file_obj).subscribe((val) => {

    for(let i = 0; i < this.file_obj.length; i++){
      this.file_obj[i]._id = val.data[i];
    }
    //reset indicators
    this.file.value = '';
    this.invalid_file = true;
  });
  
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
    for (let i = 0; i < this.userDataArr.length; i++) {
    
     var dt: any = this.datepipe.transform(this.userDataArr[i].created_time, 'yyyy-MM-dd');
   
      if (dt >= from && dt <= to) {
        
       /*  this.toast.error('From Date must be <= To Date.', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
        }); */
        this.filteredTableDataArr.push(this.userDataArr[i],);
      }
     
    }
  }
}


searchData(data){
 
 
  if(this.usertype == ""){
  this.ngOnInit();
  }
  else{
    this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
      {
      return res.usertype.toLocaleLowerCase().match(this.usertype.toLocaleLowerCase());
    });
  }
  }
  
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
pageChanged(data,event){
  // console.log(data,event);
  this._dbService.getAllUsersForAdmin(GlobalConstants.CURRENT_MODULE).subscribe((res:any) => {
    // console.log(res)

    this.userDataArr=res.results
    
    this.filteredTableDataArr = this.userDataArr;
  })

}
}
    /* 
    print() {
      let data = null;
      const doc = new jsPDF( {orientation: 'landscape'});
     
      let fileName = "Contactist.pdf";
      if (this.flagShowUserReport) {
        fileName = "Contactlist.pdf";
        //data = document.getElementById('content2');
        const col = ["contact_id", "First Name", "Last Name","Phone","Email"];
        const rows = [];
  
        for (let k = 0; k < this.contactDataArr.length; k++) {
          var temp = [this.contactDataArr[k].contact_id, this.contactDataArr[k].first_name,
          this.contactDataArr[k].last_name, this.contactDataArr[k].phone,this.contactDataArr[k].email
  
          ];
          rows.push(temp);
        }
        let pageCount = "{total_pages_count_string}";
        let today = formatDate(new Date(), 'MM/dd/yyyy', 'en-US');
      
        
        doc.autoTable(col, rows, {
          theme: 'grid',
         
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
         
            let pageSize = doc.internal.pageSize;
            let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            // Header
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');            
            doc.text('Contacts', pageWidth / 2, 10, 'center');
  
          
            let page = "Page " + doc.internal.getNumberOfPages()
           
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
} */

