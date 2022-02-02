import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseDetail } from 'src/app/models/PurchaseDetail.model';
import { SuppliernameDetail } from 'src/app/models/SuppliernameDetail.model';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { DBService } from 'src/app/services/dbservice.service';
import { UiService } from 'src/app/services/ui.service';

declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');

import html2canvas from 'html2canvas';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DynamicComponent } from 'src/app/models/utils/DynamicComponent';

@Component({
  selector: 'app-purchaseslist',
  templateUrl: './purchaseslist.component.html',
  styleUrls: ['./purchaseslist.component.css']
})
export class PurchaseslistComponent extends DynamicComponent implements OnInit {
  filter: { from: number; to: number; };
  purchaseItem=new Array<any>();
  supplierErrorName=[];
  productErrorName = [];
  wareHouseError = [];
 

  constructor(public _dbService:DBService, private _router: Router,injector: Injector, public _uiservice: UiService,
    private toast: ToastrService,private datepipe: DatePipe) { 

      super(GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_PURCHASE,injector) 
    }

  searchText;
  date;
  filterQuery = ""
  rowsOnPage = 5;
  purchaseDataArr: PurchaseDetail[] = [];
  filteredTableDataArr: any;
  flagShowQuotationReport = true;
  fromDate;
    toDate;
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

  supplierDetail: SuppliernameDetail[] = [];

  productDataArr : ProductDetail[] =[]
 
  supplier_name :any;
   
  p:number =1;
  
  
    model= {
      fromDate: "",
      toDate:""
     };
	 
	 
     purchaseDetailsCount: number=0;
     totalPurchaseAmount: number = 0;
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
    ||this._dbService.getCurrentUserDetail().usertype == CustomMisc. USER_TYPE_Marketing_Manager ||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_Manager||
    this._dbService.getCurrentUserDetail().usertype == CustomMisc.USER_TYPE_Inventory_User
    )
      
      {
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = true;
        this.ALL_DELETE_ALLOWED = false;
    }

 
      this.CAN_ADD = false;
      this._dbService.getAllProductsList().subscribe(res =>{
        if(res)
        this.productDataArr= res["data"];
      });
      this._dbService.getAllSuppliername(1).subscribe(res =>{
        if(res)
        this. supplierDetail= res["results"];
      });
    let result = await this._dbService.getAllPurchases(1).toPromise();
   // console.log("result:", result);
    this.purchaseDataArr = result["results"];
    this.filteredTableDataArr = this.purchaseDataArr;
    this.purchaseDetailsCount = result["count"];
    this.getTotalPurchase(result["results"])
  }
  
  getTotalPurchase(data){
    this.totalPurchaseAmount=0;
    for(let k of data){
      if(k.product_name.length > 0){
        k.product_name.map(x=>{
        this.totalPurchaseAmount = this.totalPurchaseAmount +x.product_Total;
        })
      }
    }
  }
  getProductDetails(productArr) {
    let names = "[";
    for (let k = 0; k < productArr.length; k++) {
      names +=  productArr[k].product_name;
      if(k<(productArr.length - 1)) names += ",";
    }
    return names + "]";
  }


  getProductDetailsCSV(productArr) {
    let names = '[{"cost":';
    let arr= ["cost","product_Total", "product_name","discount","quantity"]
    for (let k = 0; k < productArr.length; k++) {
       
      names +=  ''+ productArr[k].cost + ';'+
      '"product_Total":'+ productArr[k].product_Total + ';'+
      '"product_name":"'+ productArr[k].product_name+ '";'+
     '"discount":'+ productArr[k].discount+ ';'+
     '"quantity":'+ productArr[k].quantity
      // if(k<(productArr.length - 1)) names += ";";
    }
    return names + "}]";
  }

  async ngOnInit() {
    await this.init();
    await this.populateFields();
    
  }


  onClickEdit(obj) {
    // console.log("I am obj",obj);
    
    this._router.navigate(['inventory/purchases',obj.purchase_id]);
  }

 

  async  onClickDelete(obj) {
    if(confirm("Are you sure to delete "+obj.supplier_name)) {
      await this._dbService.deletePurchases(obj).toPromise();
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
    this.filter = {
      from: new Date(this.model.fromDate).getTime(),
      to: new Date(this.model.toDate).getTime() + 86400000,
    };
    if (this.model.fromDate == '' || this.model.toDate == '') 
    {
      this.toast.error('Please select both dates.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    } 
  
    else if((this.model.fromDate != '' && this.model.toDate !='') && (this.model.toDate) < (this.model.fromDate)){
      this.toast.error('To Date must be greater than From Date.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
      });
    }
  
    else {
      this.filteredTableDataArr = [];
      // this.purchaseDetailsCount = 1;
      this._dbService.getAllGlobalSearchInventoryByDate(this.filter.from,this.filter.to,1).subscribe((response:any)=>{
        this.filteredTableDataArr = response.data.totalPurchases;
        this.purchaseDetailsCount = response.data.totalPurchasesCount;
        this.getTotalPurchase(response.data.totalPurchases);
      })
      // let from: any = this.datepipe.transform(this.model.fromDate, 'yyyy-MM-dd');
      // let to: any = this.datepipe.transform(this.model.toDate, 'yyyy-MM-dd');    
      // for (let i = 0; i < this.purchaseDataArr.length; i++) {
      //   var dt: any = this.datepipe.transform(this.purchaseDataArr[i].purchases_date, 'yyyy-MM-dd');
      //   // var dt: any = this.datepipe.transform(this.productDetail[i].created_time, 'yyyy-MM-dd');
      //   // var dt: any = this.datepipe.transform(this.supplierDetail[i].created_time, 'yyyy-MM-dd');
      //   if (dt >= from && dt <= to) {
          
      //    /*  this.toast.error('From Date must be <= To Date.', '', {
      //       timeOut: 2000,
      //       positionClass: 'toast-top-right',
      //     }); */
      //     this.filteredTableDataArr.push(this.purchaseDataArr[i]);
      //   }
       
      // }
      // console.log("I am purchase",this.filteredTableDataArr);
      
      // this.purchaseDetailsCount=0;
      // this.getTotalPurchase(this.filteredTableDataArr);
      // this.purchaseDetailsCount =this.filteredTableDataArr.length;
      
    }
  }
  





  async downloadPdf() {
    let result = await this._dbService.getAllPurchaseList().toPromise();
    this.purchaseDataArr = result["data"];
    let data = null;
    const doc = new jsPDF();
    let fileName = "Purchaseslist.pdf";
    if (this.flagShowQuotationReport) {
      fileName = "Purchaseslist.pdf";
      const col = ["Supplier Name", "Mobile", "Purchases Date", "Product Name"];
      const rows = [];

      for (let k = 0; k < this.purchaseDataArr.length; k++) {
        var temp = [this.purchaseDataArr[k].supplier_name, this.purchaseDataArr[k].supplier_phone,
        this.purchaseDataArr[k].purchases_date,this.getProductDetails(this.purchaseDataArr[k].product_name)

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        doc.text("Report for Purchaseslist List", data.settings.margin.left, 50);
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
      let csvData = this.ConvertToCSV(data,['supplier_name',  'purchases_date', 'product_name','warehouse_name']);
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
        if(head == "product_name")
          array[i][head] =this.getProductDetailsCSV(array[i][head])
       
        line += ',' + array[i][head]; 
      }
      str += line + '\r\n';
    }
    return str;
  }

  async generateCsv() {
    let result = await this._dbService.getAllPurchaseList().toPromise();
    this.purchaseDataArr = result["data"];
    this.downloadFile(this.purchaseDataArr, 'Purchases list');
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
      pdf.save('Purchaselist.pdf'); // Generated PDF   
    });
  }
 
  
searchData(type){
 
//  this.purchaseDetailsCount=1;
  if(type == 'clear'&& !this.supplier_name)
  this.ngOnInit();
  else if(type == 'search') 
   this._dbService.getAllGlobalSearchByKeywordAndSection(this.supplier_name,'purchases').subscribe((x: any)=>{
     this.filteredTableDataArr =x.data;
     this.purchaseDetailsCount=x.data.length;
    });
  
  }
  pageChanged(data,event){
    // console.log(data,event);
    this._dbService.getAllPurchases(event).subscribe((res:any) => {
      // console.log(res)

      this.purchaseDataArr=res.results
      
      this.filteredTableDataArr = this.purchaseDataArr;
    })

  }
  key: string = 'id'
  reverse :boolean =true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  save(event: Event){
    //add new data to array
    this.filteredTableDataArr = this.filteredTableDataArr.concat(this.file_obj);
    //calculate occurence
   
// console.log("I am ",this.file_obj);

    //add deals to db
    this._dbService.addMultiplePurchase(this.file_obj).subscribe((val) => {

      for(let i = 0; i < this.file_obj.length; i++){
        this.file_obj[i]._id = val.data[i];
      }
      this.ngOnInit();
      //reset indicators
      this.file.value = '';
      this.invalid_file = true;
    });
    
  }
   escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
   replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  } 
  
  convert(objArray){
    // console.log(objArray);
   }
   onError(err){
    //  console.log(err);
   }
   onUpload(event: {type: string, data: any}) {
    //  console.log(event);
     
    if (event.type === 'success') {
      // console.log(event.data);
    } else { 
      // console.log(event.data); // error
    }
  }

   toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
  closeUpload(){
    
    document.getElementById("file")["value"]=null;  
  }
  async upload(event: Event){
    this.productErrorName=[];
    this.supplierErrorName=[]
    let suppliers:any  = await this._dbService.getAllSuppliers().toPromise();
    let warehouses:any = await this._dbService.getAllWareHouses().toPromise();
    let productErrorArray=[];
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

        // console.log("I am lines",lines);
      
        
          for(let i = 1; i < lines.length; i++){
            //split on comma
            let values = lines[i].split(',');
            // console.log("I am values",values);
            let result = this.replaceAll(this.replaceAll(this.replaceAll(this.replaceAll(values[2],  ";",","),'""','"'),'"[','['),']"',']')
            // console.log("I am result",JSON.parse(result.toString()));
            let finalItem = JSON.parse(result.toString());
            // console.log("this.productDetail",this.productDataArr);
            if(suppliers && !suppliers.data.find(x=>x.supplier_name == values[0]))
            {
              // console.log("I am error",values[0]);
              document.getElementById("file")["value"]=null; 
              // this.supplierErrorName = values[0];
              this.supplierErrorName.push(values[0] + " does not exist in supplier table error found in "+"row "+i);
              
            }
            else{
            }
            finalItem.map((item,index) => {
            let product:any = this.productDataArr.find(x=>x.product_name == item.product_name);
            // console.log("I am product",product);
            
            
            if(product){
              product.quantity =item.quantity;
              product.product_Total = item.quantity*item.cost;
              product.discount = item.discount
              this.purchaseItem.push(product);
            }
            else{
              document.getElementById("file")["value"]=null; 
              this.productErrorName.push(item.product_name + "does not exist in product table error found in "+"row "+i);
              // console.log(productErrorArray);
              
            }
            })
            if(warehouses && !warehouses.data.find(x=>x.warehouse_name == values[3].replace("\r","")))
            {
              // console.log("I am error",values[3]);
              document.getElementById("file")["value"]=null; 
              // this.supplierNameErrorFlag = true;
              // this.supplierErrorName = values[0];
              this.wareHouseError.push(values[3] + " does not exist in warehouse table error found in "+"row "+i);
              
            }
            else{
              this.wareHouseError=[];
            }
            
             
              
             
              
            // })
            // console.log("I am product", this.purchaseItem);
           
            
            // product.quantity = finalItem[0].quantity;
            // product.product_Total = finalItem[0].quantity*finalItem[0].cost;
            // product.discount = finalItem[0].discount
            // this.purchaseItem.push(product);
            // console.log("I am product",product,finalItem,this.purchaseItem);
            let date = new Date( values[1]);
            // console.log(this.toJSONLocal(date));
            
            // this.purchaseItem.product_name = products.find(p => p.product_)
        
               if(values && lines[i] && this.supplierErrorName.length<=0 && this.productErrorName.length<=0){
              //create obj based on csv values
              let obj = {
              
                supplier_name:values[0],
                purchases_date: this.toJSONLocal(date),
                product_name:this.purchaseItem,
                warehouse_name:values[3].replace("\r",""),
                supplier_id:this.supplierDetail.find(x=>x.supplier_name == values[0]).supplier_id,
                purchase_id: this.purchaseDetailsCount+1,
               created_time: Date.now(),
               modified_time: Date.now(),
               created_by: this._dbService.getCurrentUserDetail().email,
               updated_by:this._dbService.getCurrentUserDetail().email
              } as PurchaseDetail;
              //push to array
              this.file_obj.push(obj);
            }
           
            
            this.purchaseItem=[];
            
          }
           this.productErrorName = productErrorArray
          //  console.log(this.productErrorName);
          
      
        }

        //read file
        fr.readAsText(fileToUpload);
    }else{
      this.invalid_file = true;
    }
  }
}


