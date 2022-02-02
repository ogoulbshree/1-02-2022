import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';

import { Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { DBService } from 'src/app/services/dbservice.service';

declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { CustomerDetail } from 'src/app/models/CustomerDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DealDetail } from 'src/app/models/DealDetail.model';
import { ViewChild } from '@angular/core';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deallist',
  templateUrl: './deallist.component.html',
  styleUrls: ['./deallist.component.css']
})
export class DeallistComponent extends DynamicComponent implements OnInit {



  selectedProducts = new Array<any>();
  dealDataArr: DealDetail[] = [];
  filteredTableDataArr=[];
  flagShowUserReport = true;
  searchText;
  fromDate;
  toDate;
  products;
   filterQuery = ""
   rowsOnPage = 5;
   deal_name :any;
   displayValue:string;
   lastFilter: string = '';
   total_cost = 0;
   quantity = 1;
   discount = 0;
   
    p:number =1;
   invalid_file: boolean = true;
   file_obj: any[];
   file: HTMLInputElement;
   ALL_DELETE_ALLOWED = true;
   CAN_ADD = true;
   SHOW_ICONS = true;
   SHOW_EDIT_DELETE = true;
   header: boolean = true;
   @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
   in_progress: number = 0;
  created: number = 0;
  on_hold: number = 0;
  closed:number =0;
  closedDealAmount:number = 0;
  @ViewChild('csv', {static: false}) modal; 
  model: any = {
    fromDate: "",
    toDate:""
   };
   userControl = new FormControl();

   
   date = new Date;
   dealDetailsCount: number = 0;
  constructor(public _dbService:DBService,private _router: Router,private ngxCsvParser: NgxCsvParser,injector: Injector, public _uiservice: UiService,
    private datepipe: DatePipe,
    private toast: ToastrService) {

    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_DEALS,injector);
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
      this._dbService.getAllDeals(1).subscribe(deal=>{
        this.dealDataArr = deal["results"];
        this.filteredTableDataArr = deal["results"];
        this.dealDetailsCount= deal["count"];
        this.calculate_occurence();
      })
      
      
  }
  async ngOnInit() {
    
  await this.populateFields();
  await this.init();
  {
    let productResult = await this._dbService.getAllProducts(1).toPromise();
    this.products = productResult["results"];
    //add properties to the product object, needs to be created a model for mapping
    this.products.forEach(element => {
      element.selected = false;
      element.quantity = 1;
      element.discount = 0;
    })
  };
 
  }

  onClickEdit(obj) {
    this._router.navigate(['/sales/salesdeals', obj.deal_id]);
  }

 /*  async onClickDelete(obj) {
    console.log("will delete Deals:::", obj);
    await this._dbService.deleteDeal(obj).toPromise();
    await this.init();
  }
 */
  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.deal_name)) {
      await this._dbService.deleteDeal(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }




  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names +=  productArr[k].product_name;
      if(k<(productArr.length - 1)) names += ";";
    }
    return names + "]";
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
      for (let i = 0; i < this.dealDataArr.length; i++) {
        var dt: any = this.datepipe.transform(this.dealDataArr[i].created_time, 'yyyy-MM-dd');
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          
          this.filteredTableDataArr.push(this.dealDataArr[i]);
          this.calculate_occurence();
        }
       
      }
    }
  }




  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;
  
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        var data = {arr: [result]};
        data.arr = result;
       // console.log(result);
        this._dbService.uploadcsv(data).subscribe((data: any) => {
          //console.log(data);
          this._dbService.getAllDeals(1).subscribe((res: any) => {
            this.filteredTableDataArr = res.results;
          });
        })
      }, (error: NgxCSVParserError) => {
        // console.log('Error', error);
      });
  } 
   

  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, [
        'deal_name',
        'status',
        'amount',
        'expected_close_date',
        'pipeline_name',
        'salesstage_name',
        'assigned_to',
        'lead_source_name',
        'amount',
        'product_name',
        'deal_close_date',
        'probobility']);
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
      this.displayFn(array[i].product_name);
   
    
      for (let index in headerList) {
        
        let head = headerList[index];
        if(head == "product_name")
        array[i][head] = this.getProductDetails(array[i][head])
        line += ',' + array[i][head];
    
        
      }
      str += line + '\r\n';
    }
    return str;
  }

  async generateCsv(){
    let result = await this._dbService.getAllDealList().toPromise();
    // console.log("result:", result);
     this.dealDataArr = result["data"];
    this.downloadFile(this.dealDataArr, 'deallist');
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
        pdf.save('deallist.pdf'); // Generated PDF   
      });
    } 



    async downloadPdf() {
      let result = await this._dbService.getAllDealList().toPromise();
     this.dealDataArr = result["data"];
      let data = null;
      const doc = new jsPDF();
      let fileName = "deallist.pdf";
      if (this.flagShowUserReport) {
        fileName = "deallist.pdf";
        //data = document.getElementById('content2');
        const col = ["Deal Name","Status",
        "Amount","Product Name"
      /*   "Expected Close Date",
        "Pipeline Name",
        "Salesstage Name",
        "Assigned to",
        "Lead Source Name",
        "Total Cost",
        "Product Name",
        "Deal Close Date",
        "Type",
        "Probobility" */]
        const rows = [];
  
        for (let k = 0; k < this.dealDataArr.length; k++) {
          var temp = [ this.dealDataArr[k].deal_name,
          this.dealDataArr[k].amount,this.dealDataArr[k].status,this.getProductDetails(this.dealDataArr[k].product_name)
         /*  this.dealDataArr[k].pipeline_name,this.dealDataArr[k].salesstage_name,
          this.dealDataArr[k].assigned_to,this.dealDataArr[k].lead_source_name,this.dealDataArr[k].total_cost,
          this.dealDataArr[k].product_name,this.dealDataArr[k].deal_close_date,this.dealDataArr[k].type,this.dealDataArr[k].probobility, */
  
          ];
          rows.push(temp);
        }
        const header = function (data) {
          doc.setFontSize(18);
          doc.setTextColor(30);
          doc.getFontList('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Report for Deal List", data.settings.margin.left, 50);
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
                  deal_name: values[0],
                  status:values[1],
                  amount:values[2],
                  expected_close_date:values[3],
                  pipeline_name:values[4],
                  salesstage_name:values[5],
                  assigned_to:values[6],
                  lead_source_name:values[7],
                  total_cost :parseFloat(values[8]),   
                /*   product_name:this.getProductDetails(this.products), */
               product_name: this.getProductDetails(this.products),
              
             
               /*  product_name:values[9], */
                  deal_close_date:values[10],
                  probobility:values[11],
                activity_type:values[12],
                  object_type:3,
                deal_id: Date.now() + i-1,
                object_id: Date.now() + i-1, 
                  product_id: Date.now() + i-1,
               
                created_time: Date.now(),
                modified_time: Date.now(),
                created_by: this._dbService.getCurrentUserDetail().email,
                updated_by:this._dbService.getCurrentUserDetail().email
                
                } as DealDetail;

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
      this._dbService.addMultipleDeal(this.file_obj).subscribe((val) => {
  
        for(let i = 0; i < this.file_obj.length; i++){
          this.file_obj[i]._id = val.data[i];
        }
        //reset indicators
        this.file.value = '';
        this.invalid_file = true;
        this.calculate_occurence();
      });
      
    }
  calculate_occurence(){
    this.created = 0;
    this.in_progress = 0;
    this.on_hold = 0;
    this.closed = 0;
    this.closedDealAmount=0;
    this.filteredTableDataArr.map((data,index) => {
      let status = data.status.toLowerCase();
      
      if(status){
        if(status.includes("on hold")){
          this.on_hold++;
        }else if(status.includes("created")){
          this.created++;
        }else if(status.includes('in progress')){
          this.in_progress++;
        }
        else if(status.includes('closed')){
          this.closedDealAmount = this.closedDealAmount+Number(this.filteredTableDataArr[index].amount)
          this.closed++;
        }
      }
    })
    
  }
  


gettotal_cost() {
  //console.log("Total cost...");
 // console.log(this.selectedProducts);
  return this.selectedProducts.reduce((a, b) => a + (b['product_Total'] || 0), 0);
}
filter(filter: string): any {
  this.lastFilter = filter;
  if (filter) {
    return this.products.filter(option => {
      return option.product_name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
       
    })
  } else {
    return this.products.slice();
  }
}
displayFn(value: any | string): string | undefined {
  if (Array.isArray(value)) {
    value.forEach((product, index) => {
      if (index === 0) {
        this.displayValue = product.product_name;
      } else {
        this.displayValue += ', ' + product.product_name;
      }
    });
  } else {
    this.displayValue = value;
  }
  return  this.displayValue;
}
optionClicked(event: Event, product: any) {
  event.stopPropagation();
  this.toggleSelection(product);
}

//toggle checkbox and selections of product
toggleSelection(product: any) {
  product.selected = !product.selected;
  if (product.selected) {
    if(!this.isUpdate){
      
      product.product_Total = product.cost;
      
    }
    this.selectedProducts.push(product);
  } else {
    const i = this.selectedProducts.findIndex(value => (value.product_name === product.product_name));
    this.selectedProducts.splice(i, 1);
  }

  this.userControl.setValue(this.selectedProducts);
  this.total_cost =this.gettotal_cost();
}

//on change of product quantity, update corresponding values
onChangeProductQnt(index, ev){
  this.selectedProducts[index].quantity = ev.target.value;
  this.selectedProducts[index].product_Total = (this.selectedProducts[index].cost * ev.target.value)-(this.selectedProducts[index].cost * ev.target.value * this.selectedProducts[index].discount/100);
  this.total_cost =  this.gettotal_cost();
}

//on change of product discount, update corresponding values
onChangeProductDiscount(index, ev){
  this.selectedProducts[index].discount = ev.target.value;
  let total = this.selectedProducts[index].cost * this.selectedProducts[index].quantity;
  this.selectedProducts[index].product_Total = total -total * ev.target.value/100;
  this.total_cost =this.gettotal_cost();
  
}



  searchData(type){
    if(type == 'clear' && !this.deal_name)this.ngOnInit();
    else if(type == 'search')
    this._dbService.getAllGlobalSearchByKeywordAndSection(this.deal_name,'deal').subscribe((x: any)=>{this.filteredTableDataArr =x.data;
      this.dealDetailsCount = x.data.length});
  
  
    }
    pageChanged(data,event){
      // console.log(data,event);
      this._dbService.getAllDeals(event).subscribe((res:any) => {
        // console.log(res)
  
        this.dealDataArr=res.results
        
        this.filteredTableDataArr = this.dealDataArr;
      })
  
    }
  
    key: string = 'id'
    reverse :boolean =false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
}