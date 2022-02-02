import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');
import { DBService } from 'src/app/services/dbservice.service';
import html2canvas from 'html2canvas';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { ObjectDetail } from 'src/app/models/ObjectDetail.model';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';
import { UiService } from 'src/app/services/ui.service';
import { QuoteDetail } from 'src/app/models/QuoteDetail.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-quotationlist',
  templateUrl: './quotationlist.component.html',
  styleUrls: ['./quotationlist.component.css']
})
export class QuotationlistComponent extends DynamicComponent  implements OnInit {
  constructor( private _router: Router,injector: Injector, public _uiservice: UiService, private toast: ToastrService,private datepipe: DatePipe) { 

    super(GlobalConstants.SALES_COMPONENT_NAME.SALES_QUOTATION,injector);
  }
  searchText;
  productErrorName=[];
  customerErrorName=[];
  invoiceItem=new Array<any>();
  filterQuery = ""
  rowsOnPage = 5;
  quoteDataArr :QuoteDetail[] = [];
  filteredTableDataArr: any;
  flagShowQuotationReport = true;
  fromDate;
    toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;
  productDetail : ProductDetail[] =[]
  objectDetail: ObjectDetail[] = []; 
  first_name :any;
  deal_name:any;
  p:number =1;
  
  
    model ={
      fromDate: "",
      toDate:""
     };
	 
quotesDetailsCount:number=0;
totalQuotesAmount:number=0;
date = new Date;
invalid_file: boolean = true;
file_obj: any[];
file: HTMLInputElement;
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

    this._dbService.getAllProducts(1).subscribe(res =>{
      if(res)
      this.productDetail= res["results"];
    });
    this._dbService.objgetAllCustomer(1).subscribe(res =>{
      if(res)
      this.objectDetail= res["results"];
    });
      this.CAN_ADD = false;
    let result = await this._dbService.getAllQuotes(1).toPromise();
   // console.log("result:", result);
    this.quoteDataArr = result["results"];
    this.filteredTableDataArr = this.quoteDataArr;
    this.quotesDetailsCount = result["count"];
    this.getTotalQuotes(result["results"]);
  }

  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names +=  productArr[k].product_name;
      if(k<(productArr.length - 1)) names += ",";
    }
    return names + "]";
  }
  getTotalQuotes(data){
    this.totalQuotesAmount=0;
    for(let k of data){
      if(k.product_name.length > 0){
        k.product_name.map(x=>{
        this.totalQuotesAmount = this.totalQuotesAmount +x.product_Total;
        })
      }
    }
  }

  async ngOnInit() {
    await this.init();
    await this.populateFields();
  }


  onClickEdit(obj) {
    this._router.navigate(['sales/createquotation',obj.quote_id]);
  }

 

  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.first_name)) {
      await this._dbService.deleteQuote(obj).toPromise();
      //console.log("Implement delete functionality here");
      await this.init();
    }
  }


 /*  search(term: string) {
    let fieldName = "customer_name";
    this.filteredTableDataArr = this.quoteDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }
 */
  
	
 


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
      // console.log(this.quoteDataArr)
      for (let i = 0; i < this.quoteDataArr.length; i++) {
      
       var dt: any = this.datepipe.transform(this.quoteDataArr[i].created_time, 'yyyy-MM-dd');
       
        // var dt: any = this.datepipe.transform(this.productDetail[i].created_time, 'yyyy-MM-dd');
        // var dt: any = this.datepipe.transform(this.objectDetail[i].created_time, 'yyyy-MM-dd');  
        if (dt >= from && dt <= to) {
          
         /*  this.toast.error('From Date must be <= To Date.', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
          }); */
          this.filteredTableDataArr.push(this.quoteDataArr[i],);
        }
       
      }
      this.quotesDetailsCount=0;
      // console.log("I am invoice",this.filteredTableDataArr);
      
      this.getTotalQuotes(this.filteredTableDataArr);
      this.quotesDetailsCount =this.filteredTableDataArr.length;
    }
  }
  
  






  downloadPdf() {
    let data = null;
    const doc = new jsPDF();
    let fileName = "Quotationlist.pdf";
    if (this.flagShowQuotationReport) {
      fileName = "Quotationlist.pdf";
      const col = ["Customer Name", "Mobile", "Quotation Date", "Product Name"];
      const rows = [];

      for (let k = 0; k < this.quoteDataArr.length; k++) {
        var temp = [this.quoteDataArr[k].first_name, this.quoteDataArr[k].mobile,
        this.quoteDataArr[k].quotation_date, this.quoteDataArr[k].product_name

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        doc.text("Report for Quotation List", data.settings.margin.left, 50);
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
    if (this.flagShowQuotationReport) {
      let csvData = this.ConvertToCSV(data, ['customer_name', 'mobile', 'quotation_date', 'product_name']);
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
      this.getProductDetails(array[i].product_name);
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
    this.downloadFile(this.quoteDataArr, 'Quotationlist');
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
      pdf.save('Quotationlist.pdf'); // Generated PDF   
    });
  }
 
  
//  searchData(){
 
 


//   if(this.first_name == ""){
//     this.ngOnInit();
//    
//     else{
//       this.quoteDataArr = this.quoteDataArr.filter(res=>
//         {
//         return res.first_name.toLocaleLowerCase().match(this.first_name.toLocaleLowerCase());
//       });
//     }
//     } 
     searchData(type){
      if(type == 'clear' && !this.first_name)this.ngOnInit();
      else if(type == 'search')
      this._dbService.getAllGlobalSearchByKeywordAndSection(this.first_name,'quotes').subscribe((x: any)=>{this.filteredTableDataArr =x.data;
        this.quotesDetailsCount = x.data.length});
    
    
      } 
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllQuotes(event).subscribe((res:any) => {
      // console.log(res)

      this.quoteDataArr=res.results;
      
      this.filteredTableDataArr = this.quoteDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  } 
  toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
  save(event: Event){
    //add new data to array
    this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
    //calculate occurence
  //  console.log(this.filteredTableDataArr);
   

    //add deals to db
    this._dbService.addMultipleQuotes(this.file_obj).subscribe((val) => {

      for(let i = 0; i < this.file_obj.length; i++){
        this.file_obj[i]._id = val.data[i];
      }
      this.ngOnInit();
      //reset indicators
      this.file.value = '';
      this.invalid_file = true;
    });
    
  }
  async upload(event: Event){
    this.productErrorName=[];
    this.customerErrorName=[]
    // this.supplierErrorName=[];
    let customers:any = await this._dbService.getAllCustomers().toPromise();
    
    let products,finalProduct;
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
        // console.log("I am lines",lines);
        this.file_obj = [];
        this._dbService.getAllProductsList().subscribe(x=>{
          products = x["data"]
          // console.log("I am data",products);
          
        
          for(let i = 1; i < lines.length; i++){
            //split on comma
            let values = lines[i].split(',');
            // console.log("I am values",values);
            let result = this.replaceAll(this.replaceAll(this.replaceAll(this.replaceAll(values[2],  ";",","),'""','"'),'"[','['),']"',']')
            // console.log("I am result",JSON.parse(result.toString()));
            let finalItem = JSON.parse(result.toString());
            
            // let product = products.find(x=>x.product_name == finalItem[0].product_name);
            
            finalItem.map((item:any)=>{
              let product = products.find(x=>x.product_name == item.product_name);
              if(product){
                // this.productNameErrorFlag = false;
                product.quantity =item.quantity;
                product.product_Total = item.quantity*item.cost;
                product.discount = item.discount
                this.invoiceItem.push(product);
              }
              else{
                document.getElementById("file")["value"]=null; 
              this.productErrorName.push(item.product_name + " does not exist in product table error found in "+"row "+i);
              // console.log(productErrorArray);
                
              }
              
             
              
            })

            if(customers && !customers.data.find(x=>x.first_name   == values[0]))
            {
              // console.log("I am error",values[0]);
              document.getElementById("file")["value"]=null; 
              // this.supplierNameErrorFlag = true;
              // this.supplierErrorName = values[0];
              this.customerErrorName.push(values[0] + " does not exist in customer table error found in "+"row "+i);
            }
            else{
            }
            
            // product.quantity = finalItem[0].quantity;
            // product.product_Total = finalItem[0].quantity*finalItem[0].cost;
            // product.discount = finalItem[0].discount
            // this.purchaseItem.push(product);
            // console.log("I am product",product,finalItem,this.purchaseItem);
            let date = new Date( values[1]);
            // console.log(this.toJSONLocal(date));
            
            // this.purchaseItem.product_name = products.find(p => p.product_)
            if(values && lines[i] && this.customerErrorName.length<=0 && this.productErrorName.length<=0){
              //create obj based on csv values
              let obj = {
                product_name:this.invoiceItem,
                activity_type: "Customer",
                object_id:customers.data.find(x=>x.first_name == values[0]).object_id,
                quotation_date: this.toJSONLocal(date),
                created_by:this._dbService.getCurrentUserDetail().email,
                updated_by:this._dbService.getCurrentUserDetail().email,
                modified_time:Date.now(),
                created_time:Date.now(),
                quote_id:  Date.now().toString(),
                __v:0
              } ;
              //push to array
              this.file_obj.push(obj);
            }

            this.invoiceItem=[];
            
          }
        })
        }

        //read file
        fr.readAsText(fileToUpload);
    }else{
      this.invalid_file = true;
    }
  }

  closeUpload(){
    document.getElementById("file")["value"]=null; 
  }

 
}


