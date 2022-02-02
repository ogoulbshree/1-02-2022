import { Injector, OnInit } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ExpenseDetail } from 'src/app/models/ExpenseDetail.model';
import { ExpenseitemDetail } from 'src/app/models/ExpenseitemDetail';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { UiService } from 'src/app/services/ui.service';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrls: ['./expenselist.component.css']
})
export class ExpenselistComponent  extends DynamicComponent implements OnInit {
  
  expenseDataArr = [];
  filteredTableDataArr: any;
  email: string;
  expenseItemDetail: ExpenseitemDetail;
  filterQuery = ""
   rowsOnPage = 5;
   searchText;
   fromDate;
   toDate;
   model: any = {
    fromDate: "",
    toDate:""
   };
   date = new Date;
  
  @ViewChild('pdfPrint', { static: false }) pdfPrint: ElementRef;

  constructor( private _router: Router, private _activatedRoute: ActivatedRoute, injector: Injector,
    public _uiservice: UiService,private toast: ToastrService,private datepipe: DatePipe,) { 
      super(GlobalConstants.SALES_COMPONENT_NAME.SALES_ADD_EXPENSES,injector);
    }
  isUpdate = false;
  flagShowExpenseReport = true;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  
  expense_item :any;
   
  p:number =1;
  expensesDetailsCount: number = 0;
  async init() {
   
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User ||
    /*   this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Admin */
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager) 
      {

      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;

    }

      this.CAN_ADD = false;
    let result = null;
    if (this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User) {
      result = await this._dbService.getAllExpenseForEmail().toPromise();
    } else {
      result = await this._dbService.getAllExpense(1).toPromise();
    }

   // console.log("result:", result);
    this.expenseDataArr = result["results"];
    this.filteredTableDataArr = this.expenseDataArr;
    this.expensesDetailsCount = result["count"];
  }

  async ngOnInit() {
    await this.populateFields();
    this.expenseItemDetail = new ExpenseitemDetail();
    await this.init();
    this._activatedRoute.params.subscribe(
      async params => {
        //console.log("params:", params);
        let item_id = params["id"];
        if (item_id) {
          let result = await this._dbService.getExpenseItem(item_id).toPromise();
         // console.log(result);
          this.expenseItemDetail = result["data"];
          this.isUpdate = true;
        }

      });
     
  }

  async onSubmit() {
   // CustomLogger.logStringWithObject("Will save expenseItemDetail...", this.expenseItemDetail);
    
    try {
      let result = null;
      if (this.isUpdate)
        result = await this._dbService.updateExpenseItem(this.expenseItemDetail).toPromise();
      else
      
        result = await this._dbService.addExpenseItem(this.expenseItemDetail).toPromise();

    //  CustomLogger.logStringWithObject("expenseItemDetail:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("expenseItemDetail Added Successfully");
      else
        CustomMisc.showAlert("expenseItemDetail Updated Successfully");
      this._router.navigate(["/inventory/settings/dynamicsettings/addexpense"]);

    }
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Expense: " + error.message, true);
    }

  }


  onClickEdit(obj) {
    this._router.navigate(['/sales/settings/dynamicsettings/addexpense', obj.expense_id]);
  }

  /* async onClickDelete(obj) {
    console.log("will delete expense details:::", obj);
    await this._dbService.deleteExpense(obj).toPromise();
    await this.init();
  }  */
  
 
  

  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.expense_item)) {
      await this._dbService.deleteExpense(obj).toPromise();
     // console.log("Implement delete functionality here");
      await this.init();
    }
  }

  search(term: string) {
    let fieldName = "expense_item";
    this.filteredTableDataArr = this.expenseDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }


  exportToPrint() {
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
      pdf.save('ExpensesList.pdf'); // Generated PDF   
    });
  }

 /*  fileName = 'Expenselist.excel';
  exportToExcel() {
    let element = null;
    if (this.flagShowExpenseReport) {
      this.fileName = "Expenselist.xlsx";
  
      const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.expenseDataArr);
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

     
      xlsx.writeFile(wb, this.fileName);

    }
  }
 */
  downloadPdf() {
    let data = null;
    const doc = new jsPDF();
    let fileName = "Expenselist.pdf";
    if (this.flagShowExpenseReport) {
      fileName = "Expenselist.pdf";
      //data = document.getElementById('content2');
      const col = ["Expenses Id", "Expenses Item", "Date", "Amount"];
      const rows = [];

      for (let k = 0; k < this.expenseDataArr.length; k++) {
        var temp = [this.expenseDataArr[k].expense_id, this.expenseDataArr[k].expense_item,
        this.expenseDataArr[k].date, this.expenseDataArr[k].amount

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Expense List", data.settings.margin.left, 50);
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
      }
      ); doc.save(fileName);

    }
  }
  downloadFile(data, filename = 'data') {
    if (this.flagShowExpenseReport) {
      let csvData = this.ConvertToCSV(data, ['expense_id', 'expense_item', 'date', 'amount']);
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

  generateCsv() {
    this.downloadFile(this.expenseDataArr, 'Expenses');
  }
  onClickForm(){
    this.expenseItemDetail.expense_item = "";
    
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
      for (let i = 0; i < this.expenseDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.expenseDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.filteredTableDataArr.push(this.expenseDataArr[i]);
        }
       
      }
    }
  }
  
  

  
searchData(data){
 
 
  if(this.expense_item == ""){
  this.ngOnInit();
  }
  else{
    this.filteredTableDataArr = this.filteredTableDataArr.filter(res=>
      {
      return res.expense_item.toLocaleLowerCase().match(this.expense_item.toLocaleLowerCase());
    });
  }
  }
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllExpense(event).subscribe((res:any) => {
      // console.log(res)

      this.expenseDataArr=res.results
      
      this.filteredTableDataArr = this.expenseDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}