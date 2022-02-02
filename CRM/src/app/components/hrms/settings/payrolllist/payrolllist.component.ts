import { Component, Injector, } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ToastrService } from 'ngx-toastr';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { CustomerDetail } from 'src/app/models/CustomerDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-payrolllist',
  templateUrl: './payrolllist.component.html',
  styleUrls: ['./payrolllist.component.css']
})
export class PayrolllistComponent extends DynamicComponent implements OnInit {


  customerDataArr;
  filteredTableDataArr: any;
  flagShowUserReport = true;
  date = new Date;
  filterQuery = ""
  rowsOnPage = 5;

  fromDate;
  toDate;
  searchText;

  model: any = {
    fromDate: "",
    toDate: ""
  };

  first_name: any;

  p: number = 1;
  searchByNameFlag: boolean = false;


  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  header: boolean = true;
  @ViewChild('csv', { static: false }) modal;
  invalid_file: boolean = true;
  file_obj: any[];
  file: HTMLInputElement;
  customerDetailsCount: number = 0;
  employeeArr = [];

  constructor(private _router: Router, private ngxCsvParser: NgxCsvParser, injector: Injector, public _uiservice: UiService,
    private toast: ToastrService, private datepipe: DatePipe,) {
    /*  this.IMAGEBASE_URL = GlobalConstants.BACKEND_SERVER_URL; */
    super(GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYROLL,injector);

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

      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_Manager ||
      this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Sales_User
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_User
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Service_Manager
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_User
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Marketing_Manager
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
      || this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager

    ) {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = true;
      this.ALL_DELETE_ALLOWED = false;
    }
    this.CAN_ADD = false;
    let result = await this._dbService.getAllPayroll(1).toPromise();
    {
      let result = await this._dbService.getAllEmployees().toPromise();
      this.employeeArr = result["data"];
    }
    //console.log("result:", result);
    this.customerDataArr = result["results"];
    this.filteredTableDataArr = this.customerDataArr;
    this.customerDetailsCount = result["count"];
  }
  async ngOnInit() {
    await this.init();
    await this.populateFields();
  }

  onClickEdit(obj) {
    this._router.navigate(['/hrms/settings/payrolls', obj.payroll_id]);
  }

  displayName(id) {

    if (id)
      return this.employeeArr.find(x => x.employee_id === id).first_name

  }
  loadPageByNumber = async (pageNumber: number) => {
    let result = await this._dbService.getAllPayroll(pageNumber).toPromise();
    this.customerDataArr = result["results"];
    this.filteredTableDataArr = this.customerDataArr;
    this.customerDetailsCount = result["count"];
  }

  /*  async onClickDelete(obj) {
     console.log("will delete Customers:::", obj);
     await this._dbService.deleteCustomer(obj).toPromise();
     await this.init();
   }
  */


  async onClickDelete(obj, p) {
    if (confirm("Are you sure to delete " + this.displayName(obj.employee_id))) {
      await this._dbService.deletePayroll(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.loadPageByNumber(p);
    }
  }

  filterData() {
    if (this.model.fromDate == '' || this.model.toDate == '') {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }

    if ((this.model.fromDate != '' && this.model.toDate != '') && (this.model.toDate) < (this.model.fromDate)) {
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


  searchData(type) {

    if (type == 'clear' && !this.first_name) this.ngOnInit();

    else if (type == 'search')
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.first_name, 'payroll').subscribe((x: any) => {
        console.log(x);
        this.customerDataArr = x["data"];
        this.filteredTableDataArr = x["data"];
        this.customerDetailsCount = x["data"].length;
      });

  }
  key: string = 'id'
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names += productArr[k].product_name;
      if (k < (productArr.length - 1)) names += ",";
    }
    return names + "]";
  }

  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, [
        'employee_id',
        'basic_salary',
        'allowance_transportation',
        'allowance_food',
        'allowance_accomadation',
        'net_salary',
        ]);
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
        if (!array[i][head]) {
          array[i][head] = '';
        }
        if(head == "employee_id")
        array[i][head] = this.displayName(array[i][head])
       console.log(array[i]);
       
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  async generateCsv() {
    let result = await this._dbService.getAllPayrolls().toPromise();
    this.customerDataArr = result["data"];
    this.downloadFile(this.customerDataArr, 'PayRollList');
  }

  exportToPrint() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {

      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Customerlist.pdf'); // Generated PDF   
    });
  }

 

  async downloadPdf() {
    let data = null;
    let result = await this._dbService.getAllPayrolls().toPromise();
    this.customerDataArr = result["data"];
    const doc = new jsPDF();
    let fileName = "PayRollList.pdf";
    if (this.flagShowUserReport) {
      fileName = "PayRollList.pdf";
      //data = document.getElementById('content2');
      const col = ["Employee Name", "Basic Salary", "Transport Allowance", "Food Allowance","Accomadation Allowance",
      "Net Salary"];
      const rows = [];

      for (let k = 0; k < this.customerDataArr.length; k++) {
        var temp = [this.displayName(this.customerDataArr[k].employee_id),
        this.customerDataArr[k].basic_salary, this.customerDataArr[k].allowance_transportation, 
        this.customerDataArr[k].allowance_food, this.customerDataArr[k].allowance_accomadation,
        this.customerDataArr[k].net_salary

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.getFontList('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Customer List", data.settings.margin.left, 50);
      }; doc.autoTable(col, rows, {
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


  upload(event: Event) {
    //get the file target
    this.file = event.target as HTMLInputElement
    //get file variable
    let fileToUpload = this.file.files.item(0);

    //check if file is csv
    if (fileToUpload.name.includes('.csv')) {

      this.invalid_file = false;
      let fr = new FileReader();
      //read file callbacak
      fr.onload = (e) => {
        //results
        let res = fr.result as string;
        //split on new line
        let lines = res.split('\n');
        this.file_obj = [];

        for (let i = 1; i < lines.length; i++) {
          //split on comma
          let values = lines[i].split(',');
          if (values && lines[i]) {
            //create obj based on csv values
            let obj = {
              salutation: values[0],
              first_name: values[1],
              last_name: values[2],
              email: values[3],
              phone: values[4],
              home_phone: values[5],
              company_name: values[6],
              account_name: values[7],
              title: values[8],
              department: values[9],
              fax: values[10],
              dob: values[11],
              source: values[12],

              opportunity_percentage: values[13],
              linked_in_url: values[14],
              mailing_address: values[15],
              other_address: values[16],
              mailing_city: values[17],
              mailing_state: values[18],
              mailing_Postal_code: values[19],
              mailing_country: values[20],
              description: values[21],

              /*  first_name: values[0],
               last_name: values[1],
               email: values[2].replace('\r', "").toLowerCase(),
               phone: values[3], */
              object_type: 3,
              object_id: Date.now() + i - 1,
              created_time: Date.now(),
              modified_time: Date.now(),
              created_by: this._dbService.getCurrentUserDetail().email,
              updated_by: this._dbService.getCurrentUserDetail().email

            } as ObjectDetail;
            //console.log("OBJ::::", obj);
            //push to array
            this.file_obj.push(obj);
          }
        }
      }

      //read file
      fr.readAsText(fileToUpload);
    } else {
      this.invalid_file = true;
    }
  }

  save(event: Event) {
    //add new data to array
    this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
    //calculate occurence


    //add deals to db
    this._dbService.addMultipleCustomer(this.file_obj).subscribe((val) => {

      for (let i = 0; i < this.file_obj.length; i++) {
        this.file_obj[i]._id = val.data[i];
      }
      //reset indicators
      this.file.value = '';
      this.invalid_file = true;
    });

  }






  pageChanged(data, event) {
    console.log(data, event);
    this._dbService.objgetAllCustomer(event).subscribe((res: any) => {
      console.log(res)

      this.customerDataArr = res.results

      this.filteredTableDataArr = this.customerDataArr;
    })

  }



  onChangePage(filteredTableDataArr: Array<any>) {
    // update current page of items
    this.filteredTableDataArr = filteredTableDataArr;
  }
}
